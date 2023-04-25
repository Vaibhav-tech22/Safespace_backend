const express = require("express");
const {
    createSharedKeyPair,
    completeSharedKeyPair,
    getPendingSharedKeys,
    getCompleteSharedKeys,
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

router
    .route("/get/pending")
    .get(
        passport.authenticate("student", {session: false}),
        getPendingSharedKeys
    );

router
    .route("/get/complete")
    .get(
        passport.authenticate("student", {session: false}),
        getCompleteSharedKeys
    );

module.exports = router;
