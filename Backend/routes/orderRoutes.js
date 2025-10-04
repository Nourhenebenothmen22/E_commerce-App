const express = require("express");
const router = express.Router();

const{createOrder,getOrders,fetchOrderById,updateOrder,deleteOrder}=require('../controllers/orderControllers')
// 🔹 Créer une commande
router.post("/",createOrder);

// 🔹 Récupérer toutes les commandes
router.get("/",getOrders);

// 🔹 Récupérer une commande par ID
router.get("/:id",fetchOrderById);

// 🔹 Mettre à jour une commande
router.put("/:id",updateOrder);

// 🔹 Supprimer une commande
router.delete("/:id",deleteOrder);

module.exports = router;
