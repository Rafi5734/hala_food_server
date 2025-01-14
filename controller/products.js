const expressHandler = require("express-async-handler");
const Products = require("../models/products")

const getProducts = expressHandler(async (req, res) => {
  const products = await Products.find();

  if (!products) {
    res.status(404).json({ error: "Products not found" });
  }
  res.status(200).json(products);
});

const postProducts = expressHandler(async (req, res) => {
  const products = await Products.insertMany({
    category: req.body.category,
    name: req.body.name,
    imageLink: req.body.imageLink,
    price: req.body.price,
    description: req.body.description,
    discount: req.body.discount,
    quantity: req.body.quantity,
    size: req.body.size,
    SKUId: req.body.SKUId,
    status: req.body.status,
    reviews: req.body.reviews,
    sold: req.body.sold,
    stock: req.body.stock,
    subCategory: req.body.subCategory,
  });

  if (!products) {
    res.status(500).json({ message: "Products not inserted" });
  }
  res.status(200).json(products);
});

const getOneProduct = expressHandler(async (req, res) => {
  const oneProduct = await Products.findById(req.params.id);

  if (!oneProduct) {
    res.status(500).json({ message: "Product not found" });
  }
  res.status(200).json(oneProduct);
});

const updateProduct = expressHandler(async (req, res) => {
  const productUpdate = await Products.findByIdAndUpdate(
    req.params.id,
    {
      category: req.body.category,
      name: req.body.name,
      imageLink: req.body.imageLink,
      price: req.body.price,
      description: req.body.description,
      discount: req.body.discount,
      quantity: req.body.quantity,
      size: req.body.size,
      SKUId: req.body.SKUId,
      reviews: req.body.reviews,
      sold: req.body.sold,
      stock: req.body.stock,
      subCategory: req.body.subCategory,
    },
    {
      new: true,
    }
  );

  if (!productUpdate) {
    res.status(500).json({ message: "Product not updated" });
  }
  res.status(200).json(productUpdate);
});

const deleteProduct = expressHandler(async (req, res) => {
  const productDelete = await Products.findByIdAndDelete(req.params.id);

  if (!productDelete) {
    res.status(500).json({ message: "Product can not deleted!" });
  } else {
    res.status(200).json({ message: "Product delete successfully!" });
  }
});

const postComment = expressHandler(async (req, res) => {
  const productId = req.params.id;
  const { username, text } = req.body;

  try {
    // Find the product by ID
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.reviews.push({ username, text });

    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteComment = expressHandler(async (req, res) => {
  const productId = req.params.id; // Assuming you pass the product ID as a parameter in the URL
  const commentId = req.params.commentId;

  try {
    // Find the product by ID
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the index of the comment in the reviews array
    const commentIndex = product.reviews.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    // Remove the comment from the reviews array
    product.reviews.splice(commentIndex, 1);

    // Save the updated product
    const updatedProduct = await product.save();

    // res.status(200).json(updatedProduct);
    res.status(200).json({ message: "Comment delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getProducts,
  postProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  postComment,
  deleteComment,
};
