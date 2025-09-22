const userModel = require("./user-model");
const bcrypt = require("bcrypt");
const userschema = require("./user-model");
const jwt = require("jsonwebtoken");

module.exports = {
  registerController: async (req, res) => {
    try {
      const { role, name, email, password, dateofbirth, address } = req.body;
      console.log(req.body);
      if (!role || !name || !email || !password || !dateofbirth || !address) {
        return res.status(400).json({
          message: "Please Enter all required fields",
          success: false,
        });
      }
      const FindUser = await userschema.findOne({ email: email });
      if (FindUser) {
        return res
          .status(400)
          .json({ message: "User already exists", success: false });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newuser = await userModel.create({
        role: role,
        name: name,
        email: email,
        password: hashedPassword,
        dateofbirth: dateofbirth,
        address: address,
      });
      return res.status(201).json({
        message: "User created successfully",
        user: newuser,
        success: true,
      });
    } catch (error) {
      console.log(error, "hello");
    }
  },

  loginController: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Please Enter all required fields",
          success: false,
        });
      }
      const user = await userschema.findOne({ email: email.trim() });
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
      }
     const token = jwt.sign(
      { user },                        // payload
      process.env.JWT_SECRET_KEY,      // ✅ secret key from .env
      { expiresIn: "6h" }              // options
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error, "the login crashed from the backend");
    return res.status(500).json({ message: "Internal server error" });
  }
},

  getUserProfile: async (req, res) => {
    try {
      const userid = req.user._id;
      const user = await userModel.findById(userid).select("-password");
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }
      return res.status(200).json({
        message: "User profile fetched successfully",
        user,
        success: true,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const userid = req.user._id;

      if (req.file) {
        req.body.avatar = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
      }

      const user = await userModel.updateOne(
        { _id: userid },
        { $set: req.body },
        { new: true }
      );
      console.log("hellooo");

      return res.status(200).json({
        message: "Profile updated successfully",
        sucess: true,
        user,
      });
    } catch (error) {
      console.error("Update profile error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
// get pendings users (for admin)
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await userschema.find({ status: "pending" });
    return res.status(200).json({
      message: "Pending users fetched successfully",
      users: pendingUsers,
    });
  } catch (error) {
    console.log(error, "hello");
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Approve or reject user
exports.approveUser = async (req, res) => {
  try {
    const userID = await userschema.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json({ message: "User approved", userID });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.rejectUser = async (req, res) => {
  try {
    const userID = await userschema.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json({ message: "User rejected", userID });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
