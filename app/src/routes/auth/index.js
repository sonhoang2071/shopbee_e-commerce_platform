const express = require("express");
const authController = require("../../controllers/auth.controller");
const { asyncHandler } = require("../../services/asyncHandler");
const router = express.Router();

//signUp
router.post("/signup", asyncHandler(authController.signUp));

module.exports = router;
