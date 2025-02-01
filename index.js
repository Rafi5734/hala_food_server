require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const { productRouter } = require("./routes/productRoutes");
const { categoryRouter } = require("./routes/categoryRoutes");
const { checkoutRouter } = require("./routes/checkoutRoutes");
const { authRouter } = require("./routes/authRoutes");
const { orderRouter } = require("./routes/cartRoutes");
// const { sliderRoutes } = require("./routes/sliderRoutes");
const cartRoutes = require("./cart");
const sliderRoutes = require("./routes/sliderRoutes");

const app = express();
const port = 8800;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the application if DB connection fails
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/checkout", checkoutRouter);
app.use("/user", authRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRoutes);
app.use("/slider", sliderRoutes);

// Start the server
app.listen(port, () => {
  console.log("Server is running on port", port);
});
