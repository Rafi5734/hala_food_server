require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const { productRouter } = require("./routes/productRoutes");
const { categoryRouter } = require("./routes/categoryRoutes");
const { checkoutRouter } = require("./routes/checkoutRoutes");
const { authRouter } = require("./routes/authRoutes");
const { orderRouter } = require("./routes/cartRoutes");
// DB_PASS = YNnidN2YDISvRoxP;
// DB_NAME = hala_food;
const app = express();
const port = 8800;

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.static("public"));

(async () => {
  try {
    app.use("/product", productRouter);
    app.use("/category", categoryRouter);
    app.use("/checkout", checkoutRouter);
    app.use("/user", authRouter);
    app.use("/order", orderRouter);
    // app.use("/products", productsRouter);
    // app.use("/orders", ordersRouter);
  } catch (err) {
    console.log("There was some error", err);
  } finally {
    app.get("/", (req, res) => {
      res.send("Hala food Server 2, Yeh!");
    });
    app.listen(port, () => {
      console.log("server is running on", port);
    });
  }
})();
