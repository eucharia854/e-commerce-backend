const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userschema = new schema(
  {
    createdDate: {
      type: Date,
      default: Date.now
    }
  }, {timestamps: true})
module.exports = mongoose.model("Cart", userschema);
