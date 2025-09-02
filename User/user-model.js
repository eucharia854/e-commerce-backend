const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userschema = new schema({
  role: {
    type: String,
    enum: ["customer", "admin", "vendor"],
    default: "customer"
  },
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  gender:{
    type: String,
    enum: ["male", "female"],

  },
  dateofbirth:{
    type: Date,
    required: true
  },
  phone:{
    type: String,

  },
  address:{
    type: String,
    required: true
  },
  status:{
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  avatar: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }

}, {timestamps: true})
module.exports = mongoose.model("User", userschema);
