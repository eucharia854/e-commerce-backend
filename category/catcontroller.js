const userModel = require("./cat-model")

const userschema = require('./cat-model')




module.exports = {
  catController:async (req, res) => {
    try{
  const category = new Category(req.body);
  await category.save();
  return res.status(201).json({ message: "category created", category});
    } catch(error) {res.status(400).json({error: error.message});}
  },
  // get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}