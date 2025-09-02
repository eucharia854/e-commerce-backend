const express = require('express');

const router = express.Router();
const {registerController, loginController, getPendingUsers, approveUser, rejectUser } = require('./controller');
// const {protect, admin} = require("../middleware/authMiddleware"); 
 // Public routes
router.post('/register',registerController); 
router.post('/login',loginController);

// Admin routes
// router.get('/pending', getPendingUsers);
// router.put('/approve/:id', approveUser);
// router.put('/reject/:id', rejectUser);

module.exports = router;