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
    status: "pending", // Default status
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

const updateMultipleCheckoutStatus = expressHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid request, no orders selected" });
  }

  const checkouts = await Checkout.find({
    _id: { $in: ids },
    status: "pending",
  });

  console.log("Found checkouts:", checkouts);

  if (!checkouts.length) {
    return res
      .status(404)
      .json({ message: "No pending orders found for the selected IDs" });
  }

  await Checkout.updateMany(
    { _id: { $in: objectIds } },
    { status: "shipping" }
  );

  res.status(200).json({ message: "Orders updated to shipping" });
});

module.exports = {
  getCheckout,
  postCheckout,
  deleteCheckout,
  updateMultipleCheckoutStatus,
};
