const express = require("express");
const mongoose = require("mongoose"); // Add mongoose to validate ObjectId
const Cart = require("./models/cart"); // Your Cart model
const Product = require("./models/products"); // Your Product model
const router = express.Router();

// Add product to cart by _id
router.post("/add", async (req, res) => {
  const { productId } = req.body;

  // Validate productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid or missing Product ID" });
  }

  try {
    // Check if product with the given _id exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Get or create cart
    let cart = await Cart.findOne();

    if (!cart) {
      // If no cart exists, create a new one with an empty products array
      cart = new Cart({ products: [] });
    }

    // Ensure the products array is always defined
    cart.products = cart.products || [];

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      // If product exists, update quantity
      return res
        .status(200)
        .json({ message: "Product already added to the cart" });
    } else {
      // Add the product to the cart
      cart.products.push({
        productId: product._id,
        name: product.name,
        imageLink: product.imageLink,
        category: product.category,
        price: product.price,
        description: product.description,
        weight: product.weight,
        quantity: 1,
        SKUId: product.SKUId,
        status: product.status,
        reviews: product.reviews,
      });
      //   cart.products.push({ product });
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error); // Log the actual error to see what's wrong
    return res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

// Get all products in the cart
router.get("/", async (req, res) => {
  try {
    // Fetch the cart (assuming only one cart exists)
    const cart = await Cart.findOne();

    if (!cart || cart.products.length === 0) {
      return res
        .status(200)
        .json({ message: "Your cart is empty", products: [] });
    }

    // Return the cart with all products
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error); // Log the actual error to see what's wrong
    return res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

router.put("/increment", async (req, res) => {
  const { productId } = req.body;

  // Validate productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid or missing Product ID" });
  }

  try {
    // Get the cart
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Increment the quantity of the product
    cart.products[productIndex].quantity += 1;

    // Save the updated cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error); // Log the actual error to see what's wrong
    return res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

router.put("/decrement", async (req, res) => {
  const { productId } = req.body;

  // Validate productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid or missing Product ID" });
  }

  try {
    // Get the cart
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Decrement the quantity of the product
    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      return res
        .status(400)
        .json({ error: "Product quantity cannot be less than 1" });
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error); // Log the actual error to see what's wrong
    return res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

router.delete("/remove", async (req, res) => {
  const { productId } = req.body;

  // Validate productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid or missing Product ID" });
  }

  try {
    // Get the cart
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error); // Log the actual error to see what's wrong
    return res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

module.exports = router;
