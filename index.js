const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./User/user-routes");
const productRoutes = require("./product/product-routes");
const cartRoutes = require("./shoppingcart/cart-routes");
const orderRoutes = require("./order/order-routes");
const payRoutes = require("./payment/payment-routes");
const catRoutes = require("./category/cat-routes");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const connect = mongoose.connect("mongodb://localhost:27017/EKANI");
if (connect) {
  console.error("Success to connect to Database");
}
app.use(express.json({}));
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", payRoutes);
app.use("/api/category", catRoutes);
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
