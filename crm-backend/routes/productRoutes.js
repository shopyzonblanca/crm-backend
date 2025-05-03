const express = require('express');
const Product = require('../models/Product'); // Le modèle du produit
const router = express.Router();

// Ajouter un produit
router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du produit' });
  }
});

module.exports = router;
