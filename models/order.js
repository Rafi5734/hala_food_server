const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema(
  {
    category: { type: String },
    name: { type: String },
    imageLink: { type: String },
    imageLinks: [
      {
        // productId: { type: String },
        url: { type: String, required: true }, // Image URL
        title: { type: String, required: true }, // Optional title
      },
    ],
    color: { type: String },
    price: { type: Number },
    description: { type: String },
    discount: { type: String },
    quantity: { type: Number },
    SKUId: { type: String },
    status: { type: String },
    stock: { type: String },
    sold: { type: String },
    size: { type: String },
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
    subCategory: { type: String },
  },
  { timestamps: true }
);

const orders = mongoose.model("orders", orderSchema);
module.exports = orders;
