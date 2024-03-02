const express = require("express");
const { getCategory, postCategory, updateCategory, deleteCategory } = require("../controller/categoryController");


const categoryRouter = express.Router();
categoryRouter.route("/").get(getCategory).post(postCategory);

categoryRouter.route("/:id").put(updateCategory).delete(deleteCategory);


module.exports = { categoryRouter };
