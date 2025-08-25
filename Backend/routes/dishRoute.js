const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const {
  addDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");

const router = express.Router();

router.post("/", isVerifiedUser, addDish);
router.get("/", isVerifiedUser, getDishes);
router.get("/:id", isVerifiedUser, getDishById);
router.patch("/:id", isVerifiedUser, updateDish);
router.delete("/:id", isVerifiedUser, deleteDish);

module.exports = router;
