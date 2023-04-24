const express = require("express");
const {createDocument, getDocuments} = require("../controllers/documentController");
const {authenticated} = require("../utils/passport");
const router = express.Router();

//creating the document with student authenticated
router.route("/create").post(authenticated, createDocument);
router.route("/get").get(authenticated, getDocuments);
module.exports = router;
