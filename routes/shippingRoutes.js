const express = require("express");
const {
  getShipping,
  postShipping,
  updateShipping,
  deleteShipping,
} = require("../controller/shippingController");

const router = express.Router();

router.get("/", getShipping);
router.post("/", postShipping);
router.put("/:id", updateShipping);
router.delete("/:id", deleteShipping);

module.exports = router;
