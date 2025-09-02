const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userschema = new schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true
    },
    details: {
      type: String,
      enum: ["credit_card", "momo", "OM"],
      required: true
    },
    paid: {
      type: String,
      Boolean: ["True", "False",],
      default: "False"
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
module.exports = mongoose.model("Payment", userschema);