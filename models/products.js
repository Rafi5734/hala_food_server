const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productsSchema = new mongoose.Schema(
  {
    category: { type: String },
    name: { type: String },
    imageLink: { type: String },
    price: { type: Number },
    description: { type: String },
    discount: { type: String },
    quantity: { type: Number },
    quantity: { type: String },
    SKUId: { type: String },
    status: { type: String },
    stock: { type: String },
    sold: { type: String },
    reviews: [
      {
        comment_id: {
          type: String,
          default: uuidv4,
        },
        text: { type: String },
      },
    ],
    subCategory: { type: String },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("all_products", productsSchema);
module.exports = products;
