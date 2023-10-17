const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    last_login: { type: Date }
})


const userModel = model('User', userSchema);

module.exports = { userModel }
