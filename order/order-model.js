const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userschema = new schema(
  {
    
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    DeliveryDate: {
      type: Date,
      default: Date.now
    },
    Deliverystatus: {
      type: String,
      enum: ["delivered", "pending"],
      default: "pending"
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    TotalAmount: {
      type: Number,
      required: true
    }
  }, { timestamps: true })
module.exports = mongoose.model("order", userschema);
