const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      imageLink: String,
      category: String,
      price: {
        type: Number,
        required: true,
      },
      description: String,
      weight: String,
      quantity: {
        type: Number,
        default: 1,
      },
      SKUId: String,
      subCategory: { type: String },
      status: String,
      reviews: {
        type: Array,
        default: [],
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
