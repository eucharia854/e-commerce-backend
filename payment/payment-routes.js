const express = require('express');
const {payController} = require('./paycontroller');
const router = express.Router();
router.post('/payment',payController); 


module.exports = router;