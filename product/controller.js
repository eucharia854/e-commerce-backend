const productModel = require("./product-model");
const userModel = require("../User/user-model");
const userschema = require("./product-model");

module.exports = {
  createProductController: async (req, res) => {
    try {
      const seller = await userModel.findById(req.user._id);
      if (!seller) {
        return res.status(404).json({ message: "User not found" });
      }

      if (seller.role !== "vendor") {
        return res.status(403).json({ message: "Access denied" });
      }

      const { Prodname, CostPrice, PostedDate, description } = req.body;

      if (!Prodname || !CostPrice) {
        return res
          .status(400)
          .json({ message: "Please enter all required fields" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Product image is required" });
      }

      const FindProduct = await productModel.findOne({ ProdName: Prodname });
      if (FindProduct) {
        return res.status(400).json({ message: "Product already exists" });
      }

      const newProduct = await productModel.create({
        ProdName: Prodname,
        CostPrice: CostPrice,
        PostedDate: PostedDate,
        userId: req.user._id,
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
        category: req.body.category,
        description,
      });

      return res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  //get according to vendor
  getProductsController: async (req, res) => {
    try {
      const products = await productModel
        .find({ userId: req.user._id })
        .populate("userId", "name email phone")
        .populate("category", "name");
      return res.status(200).json({
        message: "Products retrieved successfully",
        products: products,
        success: true,
      });
    } catch (error) {
      console.log(error, "hello");
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  //get according to customer
  getProductsForCostumersController: async (req, res) => {
    try {
      const products = await productModel
        .find()
        .populate("userId", "name email phone")
        .populate("category", "name");
      return res.status(200).json({
        message: "Products retrieved successfully",
        products: products,
        success: true,
      });
    } catch (error) {
      console.log(error, "hello");
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
