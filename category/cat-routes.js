const express = require("express");
const { catController } = require("./catcontroller");
const router = express.Router();
router.post("/", catController);

module.exports = router;
