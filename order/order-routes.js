const express = require("express");
const router = express.Router();
const orderController = require("./order-controller");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// Customer places order
router.post("/place", authorizationMiddleware, orderController.placeOrder);

// Vendor updates order status
router.put("/:orderId/status", orderController.updateOrderStatus);

// Vendor releases payment after delivery
router.put("/:orderId/release", orderController.releasePayment);

// Customer confirms delivery
router.put("/:orderId/confirm", authorizationMiddleware, orderController.confirmDelivery);

// Admin views all orders
router.get("/", orderController.getAllOrders);
router.get("/user", authorizationMiddleware, orderController.getUserOrders);
router.get("/:orderId/qr", orderController.generateDeliveryQR);
module.exports = router;
