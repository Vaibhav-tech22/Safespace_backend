const express = require("express");
const {createDocument, getDocuments} = require("../controllers/documentController");
const passport = require("passport");
const router = express.Router();

//creating the document with student authenticated
router.route("/create").post(passport.authenticate("student", {session: false}), createDocument);
router.route("/get").get(passport.authenticate("student", {session: false}), getDocuments);
module.exports = router;
