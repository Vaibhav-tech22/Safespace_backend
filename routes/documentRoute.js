const express = require("express");
const {
    createDocument,
    getDocuments,
    saveDocument,
    getSingleDocument,
} = require("../controllers/documentController");
const {authenticated} = require("../utils/passport");
const passport = require("passport");
require("../app");
const router = express.Router();

//creating the document with student authenticated
router.post(
    "/create",
    passport.authenticate("student", {session: false}),
    createDocument
);
router.post(
    "/save",
    passport.authenticate("student", {session: false}),
    saveDocument
);
router
    .route("/get/all")
    .get(passport.authenticate("student", {session: false}), getDocuments);

router
    .route("/get")
    .get(passport.authenticate("student", {session: false}), getSingleDocument);

module.exports = router;
