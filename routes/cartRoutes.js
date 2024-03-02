const express = require("express");
const {
  addToCart,
  updateCartItem,
  deleteCartItem,
} = require("../controller/orderController");

const orderRouter = express.Router();
orderRouter.route("/:userId/cart").post(addToCart);
orderRouter.route("/:userId/cart").put(updateCartItem);
orderRouter.route("/:userId/cart/:itemId").delete(deleteCartItem);

module.exports = { orderRouter };
