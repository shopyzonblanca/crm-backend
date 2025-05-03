const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Product = require('./models/product'); // Importer le modèle Product

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Permet d'analyser les requêtes JSON

// Connexion à MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log("Erreur de connexion à MongoDB:", err));

// Route pour ajouter un produit
app.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body; // Récupérer les données du produit depuis la requête
    const newProduct = new Product({ name, price }); // Créer une nouvelle instance du modèle Product
    await newProduct.save(); // Sauvegarder le produit dans la base de données
    res.status(201).json(newProduct); // Retourner le produit créé avec un code 201 (créé)
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du produit' }); // En cas d'erreur
  }
});

// Route pour récupérer les produits (pour tester)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Récupérer tous les produits
    res.json(products); // Retourner la liste des produits
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
