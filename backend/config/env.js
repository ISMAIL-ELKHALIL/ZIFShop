require("dotenv").config("");
const bcrypt = require("bcrypt");
const { PORT, MONGODB_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

let { SALT } = process.env;
SALT = bcrypt.genSaltSync(parseInt(SALT));

module.exports = {
  PORT,
  MONGODB_URL,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  SALT,
};
