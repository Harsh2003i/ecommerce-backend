const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// PLACE ORDER (from cart)
const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount: cart.totalPrice,
    });

    // Optional: reduce stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER: My orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: All orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Update order status (with rules)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const allowed = {
      PENDING: ["PAID", "CANCELLED"],
      PAID: ["SHIPPED"],
      SHIPPED: ["DELIVERED"],
    };

    const current = order.status;
    if (!allowed[current] || !allowed[current].includes(status)) {
      return res.status(400).json({
        message: `Invalid status transition from ${current} to ${status}`,
      });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// USER: Request cancel
const requestCancel = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!["PENDING", "PAID"].includes(order.status)) {
      return res.status(400).json({ message: "Cannot cancel at this stage" });
    }

    order.cancelRequested = true;
    await order.save();

    res.json({ message: "Cancel requested", order });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ADMIN: Approve cancel & refund
const approveCancelAndRefund = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!order.cancelRequested) {
      return res.status(400).json({ message: "No cancel request" });
    }

    // Refund logic (mock)
    if (order.status === "PAID") {
      order.refundStatus = "COMPLETED";
    }

    order.status = "CANCELLED";
    await order.save();

    res.json({ message: "Order cancelled & refunded", order });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};



module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  requestCancel,
  approveCancelAndRefund,
};
