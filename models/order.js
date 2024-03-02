const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema({
  category: { type: String },
  name: { type: String },
  imageLink: { type: String },
  price: { type: Number },
  description: { type: String },
  weight: { type: String },
  quantity: { type: Number },
  SKUId: { type: String },
  reviews: [
    {
      comment_id: {
        type: String,
        default: uuidv4,
      },
      username: { type: String },
      text: { type: String },
    },
  ],
});

const orders = mongoose.model("orders", orderSchema);
module.exports = orders;
