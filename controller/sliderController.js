const Slider = require("../models/sliderModel");

// ✅ Create a new slider
exports.createSlider = async (req, res) => {
  try {
    const { title, description, image, status } = req.body;

    if (!image) return res.status(400).json({ error: "Image URL is required" });

    const slider = new Slider({ title, description, image, status });
    await slider.save();
    res.status(201).json({ message: "Slider created successfully", slider });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all sliders
exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single slider by ID
exports.getSliderById = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ error: "Slider not found" });

    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a slider
exports.updateSlider = async (req, res) => {
  try {
    const { title, description, image, status } = req.body;

    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ error: "Slider not found" });

    slider.title = title || slider.title;
    slider.description = description || slider.description;
    slider.image = image || slider.image;
    slider.status = status || slider.status;

    await slider.save();
    res.status(200).json({ message: "Slider updated successfully", slider });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a slider
exports.deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ error: "Slider not found" });

    await slider.deleteOne();
    res.status(200).json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
