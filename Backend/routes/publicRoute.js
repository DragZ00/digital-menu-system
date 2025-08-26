const router = require("express").Router();


const { addOrder } = require("../controllers/orderController");
const { getTables } = require("../controllers/tableController");
const { getCategories } = require("../controllers/categoryController");
const { getDishes } = require("../controllers/dishController");

// PUBLIC: Müşteri tarafı - login gerekmiyor
router.get("/tables", getTables);
router.get("/categories", getCategories);
router.get("/dishes", getDishes);
router.post("/orders", addOrder);  // müşterinin place order'ı

module.exports = router;
