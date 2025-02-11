const expressHandler = require("express-async-handler");
const Shipping = require("../models/shippingModel");

// Get all shipping records
const getShipping = expressHandler(async (req, res) => {
  const shippings = await Shipping.find();
  res.status(200).json(shippings);
});

// Create a new shipping record
const postShipping = expressHandler(async (req, res) => {
  const shipping = await Shipping.create(req.body);
  res.status(201).json(shipping);
});

// Update a shipping record
const updateShipping = expressHandler(async (req, res) => {
  const updatedShipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedShipping) {
    return res.status(404).json({ message: "Shipping record not found" });
  }
  res.status(200).json(updatedShipping);
});

// Delete a shipping record
const deleteShipping = expressHandler(async (req, res) => {
  const deletedShipping = await Shipping.findByIdAndDelete(req.params.id);
  if (!deletedShipping) {
    return res.status(404).json({ message: "Shipping record not found" });
  }
  res.status(200).json({ message: "Shipping record deleted successfully" });
});

module.exports = {
  getShipping,
  postShipping,
  updateShipping,
  deleteShipping,
};
