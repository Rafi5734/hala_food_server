const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const checkoutSchema = new mongoose.Schema({
  fullName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  thanaDistrict: { type: String },
  note: { type: String },
  product_quantity: { type: String },
  delivery_charge: { type: String },
  totalPrice: { type: Number },
  order: {
    category: { type: String },
    name: { type: String },
    imageLink: { type: String },
    price: { type: Number },
    description: { type: String },
    weight: { type: String },
    quantity: { type: Number },
    SKUId: { type: String },
  },
});

const checkout = mongoose.model("order_checkout", checkoutSchema);
module.exports = checkout;
