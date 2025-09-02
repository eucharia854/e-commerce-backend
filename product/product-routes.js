const express = require('express');
const {createProductController, getProductsController} = require('./controller');
const router = express.Router();
const {createProduct, getAllProducts, getVendorsProducts } = require('./controller');
// const { protect } = require("./middleware/authMiddleware");
//Public route: get all product
router.get('/', getProductsController);
// vendor routes (must be logged in)
router.post('/',  createProductController);
// router.get('/vendor/:userid',  getVendorsProducts);
module.exports = router;