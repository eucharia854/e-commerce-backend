const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Shipped", "Delivered", "Completed", "Cancelled"], 
    default: "Pending" 
  },
  paymentIntentId: { type: String }, // Stripe payment intent ID
  paymentStatus: {
    type: String,
    enum: ["Pending", "Held", "Released"],
    default: "Held"
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

