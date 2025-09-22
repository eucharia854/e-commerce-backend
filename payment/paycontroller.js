

const productModel = require("./../product/product-model");
const Order = require("./../order/order-model");
const paymentModel = require("./../payment/payment-model");

module.exports = {
  payController: async (req, res) => {
    try {
      const { details, Total, items, } = req.body;
      if(!req.user._id){
          return res.status(400).json({ message: "UserId is required" });
      }
      const userId = req.user._id; // assuming you set req.user via auth middleware

      // validate input
      if (!details || !Total || !items || items.length === 0) {
        return res.status(400).json({ message: "Please enter all required fields" });
      }

      // validate product
      // const product = await productModel.findById(productId);
      // if (!product) {
      //   return res.status(404).json({ message: "Product not found" });
      // }

      // if (Total !== product.CostPrice) {
      //   return res.status(400).json({ message: "Amount does not match cost price" });
      // }

      // create orders
      const allOrders = items.map((item) => ({
        userId,
        vendorId: item.userId?._id,
        productId: item._id,
        amount: item.CostPrice * item.qty,
        status: "Pending",
        paymentStatus: "Held",
      }));

      await Order.insertMany(allOrders);

      // create payment
      await paymentModel.create({
        details,
        paid: true,
        paymentDate,
        Total,
      });

      return res.status(201).json({ message: "Payment created successfully" });
    } catch (error) {
      console.error("Payment error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};
