const express = require("express");
const authController = require("../../controllers/auth.controller");
const router = express.Router();

//signUp
router.post("/signup",   authController.signUp);

module.exports = router;
