const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    first_name: { type: String, required: true },
    first_name: { type: String, required: true },
    email: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    active: { type: Boolean },
    last_login: { type: Date }
})


const userModel = model('User', userSchema);

module.exports = { userModel }
