const express = require('express');
const { addTable, getTables, updateTables } = require('../controllers/tableController');
const { isVerifiedUser } = require('../middlewares/tokenVerification');

const router = express.Router();


router.route("/").post(isVerifiedUser, addTable);
router.route("/").get(isVerifiedUser, getTables);
router.route("/:id").put(isVerifiedUser, updateTables);

module.exports = router;