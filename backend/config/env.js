require("dotenv").config("");
const bcrypt = require("bcrypt");

//? Variables for MONGODB AND JWT
const { PORT, MONGODB_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

//? Variables for for Bcrypt hashing
let { SALT } = process.env;
SALT = bcrypt.genSaltSync(Number(SALT));

//? Variable for NodeMailer
const { BASE_URL, HOST, EMAIL_PORT, SECURE, USER_EMAIL, PASSWORD, SERVICE } =
  process.env;

module.exports = {
  PORT,
  MONGODB_URL,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  SALT,
  BASE_URL,
  HOST,
  EMAIL_PORT,
  SERVICE,
  SECURE,
  USER_EMAIL,
  PASSWORD,
};
