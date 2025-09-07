const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userschema = new schema(
  {
    ProdName: {
      type: String,
      required: true,
    },
    CostPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", userschema);
