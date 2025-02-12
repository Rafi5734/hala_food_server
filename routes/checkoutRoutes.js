const express = require("express");
const {
  getCheckout,
  postCheckout,
  deleteCheckout,
  updateProductStatusStatus,
} = require("../controller/checkoutController");

const checkoutRouter = express.Router();
checkoutRouter.route("/").get(getCheckout).post(postCheckout);

checkoutRouter.route("/:id").delete(deleteCheckout);
checkoutRouter.route("/:id").put(updateProductStatusStatus);
// checkoutRouter.route("/status").put(updateMultipleCheckoutStatus);

module.exports = { checkoutRouter };
