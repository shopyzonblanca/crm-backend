const mongoose = require('mongoose');
require('dotenv').config();  // Charger les variables d'environnement depuis le fichier .env

const connectDB = async () => {
  try {
    // Utiliser la chaîne de connexion MongoDB à partir du fichier .env
    const uri = process.env.DB_URI;
    
    await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    console.log("MongoDB connecté");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB:", err);
    process.exit(1);  // Si une erreur se produit, arrêter le processus
  }
};

module.exports = connectDB;
