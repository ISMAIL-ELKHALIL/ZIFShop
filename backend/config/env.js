require("dotenv").config("");

const { PORT, MONGODB_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

module.exports = {
  PORT,
  MONGODB_URL,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
};
