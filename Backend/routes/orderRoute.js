const express = require('express');
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const { addOrder } = require('../controllers/orderController');
const { getOrderById } = require("../controllers/orderController");
const { getOrders } = require("../controllers/orderController");
const { updateOrder } = require("../controllers/orderController");
const router = express.Router();


router.route("/").post(isVerifiedUser, addOrder);
router.route("/:id").get(isVerifiedUser, getOrderById);
router.route("/").get(isVerifiedUser, getOrders);
router.route("/:id").put(isVerifiedUser, updateOrder);

module.exports = router;