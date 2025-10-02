const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
  // Status of the order (only these 3 values are allowed)
  status: {
    type: String,
    enum: ["pending", "paid", "shipped"], // limited to these values
    default: "pending", // default when a new order is created
  },
  // Reference to the User who placed the order
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true }); // adds createdAt & updatedAt automatically

// Export the model
module.exports = mongoose.model("Order", orderSchema);
