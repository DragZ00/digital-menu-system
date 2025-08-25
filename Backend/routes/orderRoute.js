// Backend/routes/orderRoute.js
const express = require("express");
const router = express.Router();

const { isVerifiedUser } = require("../middlewares/tokenVerification");
const {
  addOrder,
  getOrderById,
  getOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

// Sipariş oluştur
router.post("/", isVerifiedUser, addOrder);

// Siparişleri listele
router.get("/", isVerifiedUser, getOrders);

// Sipariş detay
router.get("/:id", isVerifiedUser, getOrderById);


router.put("/:id", isVerifiedUser, updateOrder);

router.delete('/:id', isVerifiedUser, deleteOrder);

module.exports = router;
