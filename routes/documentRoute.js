const express = require("express");
const {
    createDocument,
    getDocuments,
    saveDocument,
    getSingleDocument,
    addCollaborator,
    removeCollaborator,
    getSharedDocuments,
    getCollaborators,
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
    .route("/get/shared")
    .get(
        passport.authenticate("student", {session: false}),
        getSharedDocuments
    );

router
    .route("/get")
    .get(passport.authenticate("student", {session: false}), getSingleDocument);

router
    .route("/collaborator/add")
    .post(passport.authenticate("student", {session: false}), addCollaborator);

router
    .route("/collaborators/get")
    .get(passport.authenticate("student", {session: false}), getCollaborators);

router
    .route("/collaborator/remove")
    .post(
        passport.authenticate("student", {session: false}),
        removeCollaborator
    );

module.exports = router;
