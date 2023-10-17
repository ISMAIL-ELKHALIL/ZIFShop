const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    category_name: { type: String, required: true, unique: true },
    active: { type: Boolean, required: true },
})


const categoryModel = model('Category', categorySchema);



module.exports = { categoryModel }