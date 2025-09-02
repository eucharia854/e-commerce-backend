const express = require('express');
const {getCart} = require('./cart-controller');
const router = express.Router();

router.post('/shoppingcart',getCart); 

// Only Logged-in users can access cart
module.exports = router;