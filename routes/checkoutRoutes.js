const express = require("express");
const {
  getCheckout,
  postCheckout,
  deleteCheckout,
  updateMultipleCheckoutStatus,
} = require("../controller/checkoutController");

const checkoutRouter = express.Router();
checkoutRouter.route("/").get(getCheckout).post(postCheckout);

checkoutRouter.route("/:id").delete(deleteCheckout);
checkoutRouter.route("/status").put(updateMultipleCheckoutStatus);

module.exports = { checkoutRouter };
