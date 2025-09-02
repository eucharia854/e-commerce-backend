const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userschema = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

  }, {timestamps: true})

module.exports = mongoose.model("Category", userschema);
