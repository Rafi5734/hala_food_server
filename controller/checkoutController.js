const expressHandler = require("express-async-handler");
const Checkout = require("../models/checkout");
const mongoose = require("mongoose");

// Checkout APIs
const getCheckout = expressHandler(async (req, res) => {
  const checkouts = await Checkout.find();
  if (!checkouts) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.status(200).json(checkouts);
});

const postCheckout = expressHandler(async (req, res) => {
  const checkouts = await Checkout.insertMany({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    division: req.body.division,
    district: req.body.district,
    zilla: req.body.zilla,
    delivery_charge: req.body.delivery_charge,
    totalPrice: req.body.totalPrice,
    note: req.body.note,
    order: req.body.order,
    orderTime: new Date(),
    status: "pending",
  });

  if (!checkouts) {
    return res.status(500).json({ message: "Checkouts not inserted" });
  }
  res.status(200).json(checkouts);
});

const deleteCheckout = expressHandler(async (req, res) => {
  const checkoutDelete = await Checkout.findByIdAndDelete(req.params.id);

  if (!checkoutDelete) {
    return res.status(500).json({ message: "Product cannot be deleted!" });
  }
  res.status(200).json({ message: "Product deleted successfully!" });
});

const updateProductStatusStatus = expressHandler(async (req, res) => {
  // console.log("🔹 API called for product ID:", req.params.id);

  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided for update" });
  }

  try {
    const updatedCheckout = await Checkout.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // ✅ Updates only the provided properties
      { new: true }
    );

    if (!updatedCheckout) {
      // console.log("❌ Checkout not found!");
      return res.status(404).json({ message: "Checkout not found" });
    }

    // console.log("✅ Checkout updated:", updatedCheckout);
    return res.status(200).json(updatedCheckout);
  } catch (error) {
    // console.error("🔥 Update error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  getCheckout,
  postCheckout,
  deleteCheckout,
  updateProductStatusStatus,
};
