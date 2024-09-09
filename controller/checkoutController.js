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

// const getOneProduct = expressHandler(async (req, res) => {
//   const oneProduct = await Products.findById(req.params.id);

//   if (!oneProduct) {
//     res.status(500).json({ message: "Product not found" });
//   }
//   res.status(200).json(oneProduct);
// });

// const updateProduct = expressHandler(async (req, res) => {
//   const productUpdate = await Products.findByIdAndUpdate(
//     req.params.id,
//     {
//       category: req.body.category,
//       name: req.body.name,
//       imageLink: req.body.imageLink,
//       price: req.body.price,
//       description: req.body.description,
//       weight: req.body.weight,
//       quantity: req.body.quantity,
//       SKUId: req.body.SKUId,
//       reviews: req.body.reviews,
//     },
//     {
//       new: true,
//     }
//   );

//   if (!productUpdate) {
//     res.status(500).json({ message: "Product not updated" });
//   }
//   res.status(200).json(productUpdate);
// });

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
