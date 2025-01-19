const express = require("express");
const productModel = require("../models/product"); 
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find(); 
    res.status(200).json(products); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

module.exports = router;
