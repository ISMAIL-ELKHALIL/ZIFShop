const express = require("express");
const { urlencoded } = require("express");
const { router } = require('./routes/router')
const userRoutes = require("./routes/userRoutes")
const customerRoutes = require("./routes/customerRoutes")




const app = express();

//? Middleware for parsing Body
app.use(express.json());
app.use(urlencoded({ extended: true }))

//? 
app.use('/v1/customers/', userRoutes);
app.use('/v1/customers/', customerRoutes);
module.exports = { app };

