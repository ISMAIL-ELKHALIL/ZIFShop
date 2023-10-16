require('dotenv').config('');

const { PORT, MONGODB_URL } = process.env;

console.log(MONGODB_URL);

module.exports = { PORT, MONGODB_URL }