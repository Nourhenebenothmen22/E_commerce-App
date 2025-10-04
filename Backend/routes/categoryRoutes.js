const express = require("express");
const router = express.Router();

const {createCategory,getCategories,getCategoryById,updateCategory,deleteCategory}= require("../controllers/CategoryController");

// 🔹 Créer une catégorie
router.post("/",createCategory);

// 🔹 Récupérer toutes les catégories
router.get("/",getCategories);

// 🔹 Récupérer une catégorie par ID
router.get("/:id",getCategoryById);

// 🔹 Mettre à jour une catégorie
router.put("/:id",updateCategory);

// 🔹 Supprimer une catégorie
router.delete("/:id",deleteCategory);

module.exports = router;
