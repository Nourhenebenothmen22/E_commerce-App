// controllers/statsController.js
const Order = require("../models/Order");
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");

exports.getStatistics = async (req, res) => {
  try {
    // 1️⃣ Nombre d'ordres par status
    const orders = await Order.find();
    const orderStats = {
      pending: orders.filter(o => o.status === "pending").length,
      paid: orders.filter(o => o.status === "paid").length,
      shipped: orders.filter(o => o.status === "shipped").length,
      total: orders.length
    };

    // 2️⃣ Nombre d'utilisateurs par rôle
    const users = await User.find();
    const userStats = users.reduce((acc, user) => {
      const role = user.role || "user";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    // 3️⃣ Nombre de categories
    const categories = await Category.find();
    const categoryCount = categories.length;

    // 4️⃣ Nombre de produits par catégorie
    const products = await Product.find().populate("category");
    const productByCategory = {};
    products.forEach(prod => {
      const catName = prod.category?.name || "Uncategorized";
      productByCategory[catName] = (productByCategory[catName] || 0) + 1;
    });

    // 5️⃣ Réponse
    res.status(200).json({
      success: true,
      data: {
        orderStats,
        userStats,
        categoryCount,
        productByCategory
      }
    });

  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message
    });
  }
};
