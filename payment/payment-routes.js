const express = require('express');
const {payController} = require('./paycontroller');
const router = express.Router();
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

router.post('/', authorizationMiddleware, payController); 


module.exports = router;