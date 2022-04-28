const express = require("express");
const authCont = require("../controllers/authcont");
const router = express.Router();

router.post("/login", authCont.login);
router.post("/signup", authCont.signup);

module.exports = router;
