const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productsSchema = new mongoose.Schema({
  category: { type: String },
  name: { type: String },
  imageLink: { type: String },
  firstImageLink: { type: String },
  secondImageLink: { type: String },
  thirdImageLink: { type: String },
  fourthImageLink: { type: String },
  fifthImageLink: { type: String },
  price: { type: Number },
  description: { type: String },
  discount: { type: String },
  quantity: { type: Number },
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
      username: { type: String },
      text: { type: String },
    },
  ],
  subCategory: { type: String },
});

const products = mongoose.model("all_products", productsSchema);
module.exports = products;
