const express = require("express");
const {
  getProducts,
  postProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  postComment,
  deleteComment,
  addImageToProduct,
  updateProductStatusStatus,
} = require("../controller/products");

const productRouter = express.Router();
productRouter.route("/").get(getProducts).post(postProducts);
productRouter.route("/add-image-to-product").post(addImageToProduct);

productRouter
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct)
  .put(updateProductStatusStatus);

productRouter.route("/:id/comments").post(postComment);
productRouter.route("/:id/comments/:commentId").delete(deleteComment);

module.exports = { productRouter };
