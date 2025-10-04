const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary"); 
const upload = multer({ storage });

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

// 🔹 Routes publiques
router.get("/", getProducts);
router.get("/:id", getProductById);

// 🔹 Routes privées (auth à ajouter selon ton middleware)
router.post("/", upload.array("images", 5), createProduct); // jusqu'à 5 images
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
