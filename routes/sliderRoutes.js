const express = require("express");
const router = express.Router();
const sliderController = require("../controller/sliderController");

// Routes
router.post("/", sliderController.createSlider);
router.get("/", sliderController.getAllSliders);
router.get("/:id", sliderController.getSliderById);
router.put("/:id", sliderController.updateSlider);
router.delete("/:id", sliderController.deleteSlider);

module.exports = router;
