const express = require("express");
const { catController, getAllCategories } = require("./catcontroller");
const router = express.Router();
router.post("/", catController);
router.get("/", getAllCategories);

module.exports = router;
