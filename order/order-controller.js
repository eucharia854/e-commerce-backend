const dotenv = require("dotenv");
dotenv.config();
const Order = require("./order-model");
const Stripe = require("stripe");
const QRCode = require("qrcode");
// Commission (10%)
const COMMISSION_RATE = 0.1;

// Initialize Stripe with secret key
let stripe;
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} catch (err) {
  console.error("Stripe not configured:", err.message);
  stripe = null;
}

/**
 * Place Order (Customer Checkout)
 */
exports.placeOrder = async (req, res) => {
  try {
    // if (!stripe) {
    //   return res.status(500).json({ success: false, error: "Stripe not configured" });
    // }
    
    const userId = req.user._id;
    const {items} = req.body;

    // Create payment intent (funds held until captured)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100, // in cents
    //   currency: "usd",
    //   payment_method: paymentMethodId,
    //   confirm: true,
    //   capture_method: "manual", // hold until delivery confirmed
    // });

    // Save order in DB
    const allOrders = items?.map((item) => ({userId, vendorId:item.userId?._id, productId:item._id, amount: item.CostPrice*item.qty, paymentIntentId: "paymentIntent.id",
      status: "Pending",
      paymentStatus: "Held"}));

    const ordersCreate = await Order.insertMany(allOrders);
    res.status(201).json({ success: true, data: ordersCreate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message, error:err });
  }
};

/**
 * Update Order Status (Vendor ships/delivers)
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Release Payment (Vendor releases funds after delivery)
 */
exports.releasePayment = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ success: false, error: "Stripe not configured" });
    }

    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.paymentStatus === "Released") {
      return res.status(400).json({ success: false, message: "Payment already released" });
    }

    // Capture payment
    await stripe.paymentIntents.capture(order.paymentIntentId);

    // Calculate commission
    const commission = order.amount * COMMISSION_RATE;
    const vendorAmount = order.amount - commission;

    // Transfer vendor’s share
    await stripe.transfers.create({
      amount: vendorAmount * 100,
      currency: "usd",
      destination: "vendor_stripe_account_id", // vendor's connected Stripe account
    });

    // Update order
    order.status = "Completed";
    order.paymentStatus = "Released";
    await order.save();

    res.json({ success: true, message: "Payment released to vendor", order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Admin: View All Orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId vendorId productId");
    res.json({ success: true, data:orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.generateDeliveryQR = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // create unique token
    const token = Math.random().toString(36).substring(2);
    order.deliveryToken = token;
    await order.save();

    const payload = { orderId, vendorId: order.vendorId, token };
    const qrImage = await QRCode.toDataURL(JSON.stringify(payload));

    res.json({ success: true, qrImage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Customer confirms delivery
exports.confirmDelivery = async (req, res) => {
  try {
    const { orderId, vendorId, token } = req.body;

    const order = await Order.findOne({ _id: orderId, vendorId});

    if (!order) return res.status(400).json({ success: false, message: "Order not found" });

    if (!order.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: "Not authorized" });

    order.status = "Delivered"; // prevent reuse
    await order.save();

    res.status(200).json({ success: true, message: "Delivery confirmed!" });
  } catch (err) {
    console.log("Error: ", err)
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {   
      const orders = await Order.find().populate("productId vendorId userId");
      const userOrders = orders.filter(ord => ord.userId.equals(req.user._id) || ord.vendorId.equals(req.user._id));
      return res.status(200).json({ success: true, data: userOrders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};