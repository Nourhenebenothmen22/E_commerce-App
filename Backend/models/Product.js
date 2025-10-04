const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // product name
  price: { type: Number, required: true }, // product price
  stock: { type: Number, default: 0 }, // available stock
   images: [
    {
      url: String,       // URL de l'image sur Cloudinary
      public_id: String, // ID pour pouvoir supprimer l'image si nécessaire
    },
  ],
  // Each product belongs to a single category
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  }
}, { timestamps: true }); // adds createdAt and updatedAt automatically

module.exports = mongoose.model("Product", productSchema);
