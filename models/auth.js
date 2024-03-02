// models/User.js

const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cart: { type: Array },
});

const User = mongoose.model("all_users", authSchema);

module.exports = User;
