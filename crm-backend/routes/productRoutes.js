const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Ajouter un produit
router.post('/', async (req, res) => {
  const { name, description, price, stock } = req.body;
  const newProduct = new Product({ name, description, price, stock });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
