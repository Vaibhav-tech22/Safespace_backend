const express = require("express");
const passport = require("passport");
const {
    registerUser,
    loginUser,
    verifyOtp,
    loginOtp,
    addFavourites,
    getFavourites,
} = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signup/verify").post(verifyOtp);
router.route("/login").post(loginUser);
router.route("/login/verify").post(loginOtp);
router
    .route("/favorite/toggle")
    .post(passport.authenticate("student", {session: false}), addFavourites);
router
    .route("/documents/get/favorites")
    .get(passport.authenticate("student", {session: false}), getFavourites);
module.exports = router;
