const express = require("express");
const {
  createProductController,
  getProductsController,
  getProductsForCostumersController,
} = require("./controller");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getVendorsProducts,
} = require("./controller");
const checkIfUserIsAuthenticated = require("../middleware/authorizationMiddleware");
const upload = require("../middleware/fileUploadMiddleware");

router.use(checkIfUserIsAuthenticated);
router.get("/", getProductsController);
router.get("/for-customers", getProductsForCostumersController);
router.post("/", upload.single("imageUrl"), createProductController);

// const { protect } = require("./middleware/authMiddleware");
//Public route: get all product
// vendor routes (must be logged in)
// router.get('/vendor/:userid',  getVendorsProducts);
module.exports = router;
