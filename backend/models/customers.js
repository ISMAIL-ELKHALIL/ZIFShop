const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
    first_name: { type: String, required: true },
    first_name: { type: String, required: true },
    email: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    active: { type: Boolean },
    valid_account: { type: Boolean },
    last_login: { type: Date }
})



const customerModel = model('Customer', customerSchema);



module.exports = { customerModel }