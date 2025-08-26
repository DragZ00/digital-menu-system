const router = require("express").Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");

// CONTROLLERS
const { addTable, deleteTable, updateTable, getTables } = require("../controllers/tableController");
const { addDish, deleteDish, updateDish, getDishes } = require("../controllers/dishController");
const { getOrders, updateOrder, deleteOrder, getOrderById } = require("../controllers/orderController");

// 🔒 Tüm admin uçları korumalı
router.use(isVerifiedUser);

// Tables
router.get("/tables", getTables);
router.post("/tables", addTable);
router.patch("/tables/:id", updateTable);
router.delete("/tables/:id", deleteTable);

// Dishes
router.get("/dishes", getDishes);
router.post("/dishes", addDish);
router.patch("/dishes/:id", updateDish);
router.delete("/dishes/:id", deleteDish);

// Orders
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

module.exports = router;
