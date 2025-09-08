const express = require("express");
const upload = require("../middleware/fileUploadMiddleware");
const checkIfUserIsAuthenticated = require("../middleware/authorizationMiddleware");

const {
  registerController,
  loginController,
  getUserProfile,
  getPendingUsers,
  approveUser,
  rejectUser,
} = require("./controller");
const { updateUserProfile } = require("./controller");

const router = express.Router();

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);

// Update user profile (with avatar upload)
router.put(
  "/profile",
  checkIfUserIsAuthenticated,
  upload.single("avatar"),
  updateUserProfile
);
router.get("/profile", checkIfUserIsAuthenticated, getUserProfile);

module.exports = router;
