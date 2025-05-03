const mongoose = require('mongoose');

// Définir le schéma du produit
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

// Créer le modèle à partir du schéma
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
