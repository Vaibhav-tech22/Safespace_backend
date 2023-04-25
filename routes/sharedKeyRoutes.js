const express = require("express");
const {
    createSharedKeyPair,
    completeSharedKeyPair,
} = require("../controllers/sharedKeyControllers.js");
const passport = require("passport");
require("../app");
const router = express.Router();

router
    .route("/add")
    .post(
        passport.authenticate("student", {session: false}),
        createSharedKeyPair
    );

router
    .route("/complete")
    .post(
        passport.authenticate("student", {session: false}),
        completeSharedKeyPair
    );

module.exports = router;
