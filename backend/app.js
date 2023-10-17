const express = require("express");
const app = express();
const { router } = require('./routes/router')

app.use('./', router)
module.exports = { app };

