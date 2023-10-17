const { connect } = require('mongoose');
const { MONGODB_URL } = require('./env.js');



async function runMongoDB() {
    try {
        // Connect to MongoDB
        await connect(MONGODB_URL.toString());
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { runMongoDB };