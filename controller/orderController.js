const User = require("../models/auth");
const Products = require("../models/products");

const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { _id } = req.body;

    // const user = await User.findById(userId);

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // Find the product by ID
    const product = await Products.findById(_id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("product", product);
    // Add the product to the user's cart
    User.cart.push(product);
    await User.save();

    res.json({ message: "Product added to the cart", product });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { _id, quantity } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingCartItemIndex = user.cart.findIndex(
      (item) => item._id.toString() === _id
    );

    if (existingCartItemIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Update the quantity of the product in the cart
    user.cart[existingCartItemIndex].quantity = quantity;

    await user.save();

    console.log("cart: user.cart", user.cart);
    res.json({ message: "Cart item updated successfully", cart: user.cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the item from the cart based on the itemId
    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
    await user.save();

    res.json({ message: "Item removed from the cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  deleteCartItem,
};
