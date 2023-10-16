const { connect } = require('mongoose');
const { MONGODB_URL } = require('./env.js');



async function runMongoDB() {
    //Connect to MongoDB  
    await connect(MONGODB_URL);
}


module.exports = { runMongoDB };