const { Schema, model } = require("mongoose");

const subCategorySchema = new Schema({
    subcategory_name: { type: String, required: true, unique: true },
    category_id: { type: String, required: true },
    active: { type: Boolean, default: false },
})


const subCategoryModel = model('subCategory', subCategorySchema);

module.exports = { subCategoryModel }