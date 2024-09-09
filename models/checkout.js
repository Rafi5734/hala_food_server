const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const checkoutSchema = new mongoose.Schema({
  fullName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  thanaDistrict: { type: String },
  note: { type: String },
  delivery_charge: { type: String },
  totalPrice: { type: Number },
  order: [],
});

const checkout = mongoose.model("order_checkout", checkoutSchema);
module.exports = checkout;
