const router = require("express").Router();
const { addCategory, getCategories, deleteCategory } = require("../controllers/categoryController");
const { isVerifiedUser } = require("../middlewares/tokenVerification"); // varsa

router.route("/")
  .get(getCategories)
  .post(isVerifiedUser, addCategory);     // auth istemezsen isVerifiedUser'ı kaldır

router.route("/:id")
  .delete(isVerifiedUser, deleteCategory);

module.exports = router;
