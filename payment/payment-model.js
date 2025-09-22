const mongoose = require('mongoose');
const schema = mongoose.Schema;
const paymentSchema = new schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: false,
    },
    details: {
      type: String,
      enum: ["credit_card", "momo", "OM"],
      required: true
    },
    paid: {
      type: Boolean,
     
      default: false
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    Total: {
      type: Number,
      required: true
    }
  })
module.exports = mongoose.model("Payment", paymentSchema);