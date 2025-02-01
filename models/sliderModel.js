const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Image URL or file path
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Slider", sliderSchema);
