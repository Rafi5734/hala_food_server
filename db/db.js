const mongoose = require('mongoose')
const mongoDB_URL = require("../dbconfig")

const connectDB = async () => {
  try {
    const client = await mongoose.connect(mongoDB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
