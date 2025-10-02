const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      unique: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
