const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: String, // user's name
  email: { 
    type: String, 
    unique: true // ensures no duplicate emails
  },
  password: String, // hashed password (to be encrypted later)
  role: { 
    type: String, 
    enum: ["customer", "admin"], 
    default: "customer" // default role is customer
  },
  // An array of orders linked to this user
  orders: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order' 
    }
  ]
}, { timestamps: true }); // adds createdAt & updatedAt

// Export the model
module.exports = mongoose.model('User', userSchema);
