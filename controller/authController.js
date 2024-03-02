// controllers/UserController.js

const User = require("../models/auth");
const expressHandler = require("express-async-handler");

const registerUser = async (req, res) => {
  try {
    const { userName, password, phoneNumber } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({
      $or: [{ userName }, { phoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or phone number already in use" });
    }

    // Create a new user
    const newUser = new User({ userName, password, phoneNumber });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password, phoneNumber } = req.body;

    // Find the user by username
    const user = await User.findOne({ userName, phoneNumber });

    // If the user is not found or the password is incorrect
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Login successful
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = expressHandler(async (req, res) => {
  const users = await User.find();
  // console.log(users.length);

  if (!users) {
    res.status(404).json({ error: "Users not found" });
  }
  res.status(200).json(users);
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
