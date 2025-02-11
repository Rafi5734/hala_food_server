const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  thanaDistrict: { type: String, required: true },
  delivery_charge: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  note: { type: String },
  order: { type: Array, required: true },
  orderTime: { type: Date, required: true },
  shippingTime: { type: Date, default: Date.now },
  status: { type: String, enum: ["shipping", "delivered"], default: "shipping" },
});

module.exports = mongoose.model("Shipping", ShippingSchema);
