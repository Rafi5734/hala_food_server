const express = require("express");
const {
  getProducts,
  postProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  postComment,
  deleteComment,
} = require("../controller/products");

const productRouter = express.Router();
productRouter.route("/").get(getProducts).post(postProducts);

productRouter
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

productRouter.route("/:id/comments").post(postComment);
productRouter.route("/:id/comments/:commentId").delete(deleteComment);

module.exports = { productRouter };
