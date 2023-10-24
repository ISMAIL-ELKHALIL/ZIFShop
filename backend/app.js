const express = require("express");
const { urlencoded } = require("express");
const { router } = require("./routes/router");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

//?Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

//? Middleware for parsing Body
app.use(express.json());
app.use(urlencoded({ extended: true }));

//Todo: Use the express-rate-limit for login and rest-Password routes

//?
app.use("/v1/users/", userRoutes);
app.use("/v1/customers/", customerRoutes);
app.use("/v1/categories/", categoryRoutes);
module.exports = { app };
