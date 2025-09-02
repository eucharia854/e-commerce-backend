const express = require('express');
const {catController} = require('./catcontroller');
const router = express.Router();
router.post('/category',catController); 


module.exports = router;