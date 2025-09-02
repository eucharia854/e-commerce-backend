const productModel = require("./product-model")
const userModel = require("../User/user-model")
const userschema = require('./product-model')

module.exports = {
  createProductController: async (req, res) => {
    try {
      const { userid } = req.params
      if (!userid) {
        return res.status(400).json({ message: "User ID is required" })
      }
const seller = await userModel.findById({_id: userid})
console.log(seller, "seller");

if(seller.role !== 'seller'){
        return res.status(403).json({ message: "Access denied" })
      }
      const { Prodname, CostPrice, PostedDate } = req.body
      if (!Prodname || !CostPrice || !PostedDate) {
        return res.status(400).json({ message: "Please Enter all required fields" })
      }
      const FindProduct = await productModel.findOne({ Prodname: Prodname })
      if (FindProduct) {
        return res.status(400).json({ message: "Product already exists" })
      }
      const newproduct = await productModel.create({
        ProdName: Prodname,
        CostPrice: CostPrice,
        userId: userid
      });
      return res.status(201).json({ message: "Product created successfully", product: newproduct });
    }
    catch (error) {
      console.log(error, "hello")
    }
  },
  getProductsController:async(req, res)=>{
    try{
    const products = await productModel.find().populate('userId', 'name email phone');
    return res.status(200).json({ message: "Products retrieved successfully", products: products });
  } catch (error) {
    console.log(error, "hello");
    return res.status(500).json({ message: "Internal server error" });
  }
}}