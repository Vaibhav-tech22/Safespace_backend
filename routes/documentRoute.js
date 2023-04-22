const express = require("express");
const {createDocument} = require("../controllers/documentController");

const router = express.Router();

router.route("/create").post(createDocument);

module.exports = router;
