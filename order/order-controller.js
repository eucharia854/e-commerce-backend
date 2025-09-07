const userModel = require("./order-model")

const userschema = require('./order-model')




module.exports = {
  orderController:async (req, res) => {
    try{
    const {userID, DeliveryDate, TotalAmount, Deliverystatus } = req.body
    if (!userID || !DeliveryDate || !TotalAmount || !Deliverystatus){
      return res.status(500).json({ message: "userID is required" })
    }
    const FindUser = await userschema.findOne({userID: userID})
    if (FindUser){
      return res.status(400).json({ message: "order already exists" })}
const newuser = await userModel.create({
  userID: userID,
  DeliveryDate: DeliveryDate,
  TotalAmount: TotalAmount,
  Deliverystatus: Deliverystatus,
  orderDate: orderDate
});

return res.status(201).json({ message: "order processed successfully", user: newuser });
}
catch(error){
  console.log(error, "hello")
}
  }
}