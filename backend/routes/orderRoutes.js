const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  requestCancel,
  approveCancelAndRefund,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// USER
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.put("/:id/cancel", protect, requestCancel);

// ADMIN
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.put("/:id/cancel/approve", protect, adminOnly, approveCancelAndRefund);

module.exports = router;
