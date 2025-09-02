const userModel = require("./payment-model")

const userschema = require('./payment-model')




module.exports = {
  payController:async (req, res) => {
    try{
    const {orderId, details, paid, paymentDate, Total} = req.body
    if (!orderId || !details || !paid || !paymentDate || !Total){
      return res.status(400).json({ message: "Please Enter all required fields" })
    }
    const FindUser = await userschema.findOne({orderId: orderId})
if (FindUser){
  return res.status(400).json({ message: "Payment already exists" })
}
const newuser = await userModel.create({
  orderId: orderId,
  details: details,
  paid: paid,
  paymentDate: paymentDate,
  Total: Total
});

return res.status(201).json({ message: "Payment created successfully", payment: newuser });
}
catch(error){
  console.log(error, "hello")
}
  }
}
