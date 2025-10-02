const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true, // no duplicate names allowed
    required: true
  },
  // A category can have multiple products
  products: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' // references the Product model
    }
  ]
}, { timestamps: true }); // adds createdAt and updatedAt automatically

module.exports = mongoose.model("Category", categorySchema);
