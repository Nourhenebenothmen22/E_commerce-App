const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "paid", "shipped"],
    default: "pending",
  },
});
module.exports = mongoose.model("Order", orderSchema);
