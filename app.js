const express = require('express');
const userRoute = require('./routes/userRoute');
const app = express();

app.use(express.json());
app.use('/api/v1', userRoute);

module.exports = app;

