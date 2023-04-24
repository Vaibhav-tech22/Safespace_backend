const express = require("express");
const {createDocument, getDocuments} = require("../controllers/documentController");
const {authenticated} = require("../utils/passport");
const passport = require("passport");
require('../app');
const router = express.Router();

//creating the document with student authenticated
router.post(
    '/create',
    passport.authenticate("student", {session:false}), 
    createDocument
);

router.route("/get").get(passport.authenticate("student", {session:false}), getDocuments);
module.exports = router;
