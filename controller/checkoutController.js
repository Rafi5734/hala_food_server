const expressHandler = require("express-async-handler");
const Checkout = require("../models/checkout");

const getCheckout = expressHandler(async (req, res) => {
  const checkouts = await Checkout.find();
  // console.log(users.length);

  if (!checkouts) {
    res.status(404).json({ error: "Order not found" });
  }
  res.status(200).json(checkouts);
});

const postCheckout = expressHandler(async (req, res) => {
  const checkouts = await Checkout.insertMany({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    thanaDistrict: req.body.thanaDistrict,
    delivery_charge: req.body.delivery_charge,
    totalPrice: req.body.totalPrice,
    note: req.body.note,
    order: req.body.order,
  });

  if (!checkouts) {
    res.status(500).json({ message: "Checkouts not inserted" });
  }
  res.status(200).json(checkouts);
});

const deleteCheckout = expressHandler(async (req, res) => {
  const checkoutDelete = await Checkout.findByIdAndDelete(req.params.id);

  if (!checkoutDelete) {
    res.status(500).json({ message: "Product can not deleted!" });
  } else {
    res.status(200).json({ message: "Product deleted successfully!" });
  }
});


module.exports = {
  getCheckout,
  postCheckout,
  deleteCheckout,
};
