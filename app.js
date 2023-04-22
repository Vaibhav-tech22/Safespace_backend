const express = require("express");
const userRoute = require("./routes/userRoute");
const documentRoute = require("./routes/documentRoute");
const app = express();

app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/document", documentRoute);

module.exports = app;
