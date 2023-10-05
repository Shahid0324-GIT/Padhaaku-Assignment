const express = require("express");
const router = express.Router();

const { signUp, allUsers } = require("../controllers/api");

router.route("/").post(signUp).get(allUsers);
router.route("/login");

module.exports = router;
