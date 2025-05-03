const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();  // Charger les variables d'environnement depuis le fichier .env

const app = express();
const PORT = process.env.PORT || 5001;  // Utiliser le port 5001 si process.env.PORT n'est pas défini

// Middleware
app.use(cors()); // Permet les requêtes CORS
app.use(express.json()); // Permet de lire le JSON dans les requêtes

// Connexion à MongoDB via la chaîne de connexion stockée dans le fichier .env
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log("Erreur de connexion à MongoDB:", err));

// Exemple de modèle (assurez-vous que vous avez défini un modèle pour Product)
const Product = mongoose.model('Product', {
  name: String,
  price: Number
});

// Route pour récupérer la liste des produits
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();  // Récupère tous les produits de la base de données
    res.json(products);  // Retourne les produits sous forme de JSON
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
