const express = require("express");
const {
    createDocument,
    getDocuments,
    saveDocument,
    getSingleDocument,
    addCollaborator,
} = require("../controllers/documentController");
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

router
    .route("/collaborator/add")
    .post(passport.authenticate("student", {session: false}), addCollaborator);

module.exports = router;
