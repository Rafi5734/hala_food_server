const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controller/authController");

const authRouter = express.Router();
// authRouter.route("/registration").post(registerUser);
authRouter.route("/registration").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/").get(getAllUsers);

module.exports = { authRouter };
