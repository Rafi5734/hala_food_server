const express = require("express");
const { getCheckout, postCheckout, deleteCheckout } = require("../controller/checkoutController");


const checkoutRouter = express.Router();
checkoutRouter.route("/").get(getCheckout).post(postCheckout);

checkoutRouter.route("/:id").delete(deleteCheckout);

module.exports = { checkoutRouter };
