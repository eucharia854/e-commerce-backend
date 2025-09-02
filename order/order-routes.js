const express = require('express');
const {orderController} = require('./order-controller');
const router = express.Router();
router.post('/order',orderController); 


module.exports = router;