const Payment = require("../models/Payment");
const Order = require("../models/Order");

// USER: create mock payment
const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const payment = await Payment.create({
      order: order._id,
      user: req.user._id,
      amount: order.totalAmount,
    });

    res.json({
      message: "Payment initiated (mock)",
      paymentId: payment._id,
      amount: payment.amount,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// USER: confirm mock payment
const confirmPayment = async (req, res) => {
  try {
    const { paymentId, success } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = success ? "SUCCESS" : "FAILED";
    payment.reference = `MOCK-${Date.now()}`;
    await payment.save();

    if (success) {
      await Order.findByIdAndUpdate(payment.order, { status: "PAID" });
    }

    res.json({ message: "Payment processed", payment });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { createPayment, confirmPayment };
