const express = require("express");
const authController = require("../../controllers/auth.controller");
const { asyncHandler } = require("../../helpers");
const {
    authentication,
} = require("../../middlewares/authentication.middleware");
const router = express.Router();

//signUp
router.post("/signUp", asyncHandler(authController.signUp));
router.post("/signIn", asyncHandler(authController.signIn));

//authentication
router.use(authentication);
router.post("/logout", asyncHandler(authController.logout));
router.post("/refresh-token", asyncHandler(authController.handlerRefreshToken));

module.exports = router;
