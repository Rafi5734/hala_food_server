const expressHandler = require("express-async-handler");
const Category = require("../models/category")
const getCategory = expressHandler(async (req, res) => {
  const category = await Category.find();
  // console.log(users.length);

  if (!category) {
    res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json(category);
});

const postCategory = expressHandler(async (req, res) => {
  const category = await Category.insertMany({
    category: req.body.category,
  });

  if (!category) {
    res.status(500).json({ message: "Category not inserted" });
  }
  res.status(200).json(category);
});

// const getOneProduct = expressHandler(async (req, res) => {
//   const oneProduct = await Products.findById(req.params.id);

//   if (!oneProduct) {
//     res.status(500).json({ message: "Product not found" });
//   }
//   res.status(200).json(oneProduct);
// });

const updateCategory = expressHandler(async (req, res) => {
  const categoryUpdate = await Category.findByIdAndUpdate(
    req.params.id,
    {
      category: req.body.category,
    },
    {
      new: true,
    }
  );

  if (!categoryUpdate) {
    res.status(500).json({ message: "Category not updated" });
  }
  res.status(200).json(categoryUpdate);
});

const deleteCategory = expressHandler(async (req, res) => {
  const categoryDelete = await Category.findByIdAndDelete(req.params.id);

  if (!categoryDelete) {
    res.status(500).json({ message: "Category can not deleted!" });
  } else {
    res.status(200).json({ message: "Category delete successfully!" });
  }
});





module.exports = {
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
