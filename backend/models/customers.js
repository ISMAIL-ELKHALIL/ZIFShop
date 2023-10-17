const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    valid_account: { type: Boolean, default: false },
    last_login: { type: Date },
    active: { type: Boolean, default: false },
})



const customerModel = model('Customer', customerSchema);



module.exports = { customerModel }