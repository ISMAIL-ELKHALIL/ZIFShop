const { Schema, model } = require("mongoose");


const productSchema = new Schema({
    sku: { type: String, required: true },
    product_image: { type: String, required: true },
    product_name: { type: String, required: true },
    subcategory_id: { type: String },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    price: { type: Number, required: true },
    discount_price: { type: Number },
    options: { type: Array },
    active: { type: Boolean, required: true },
})

const productModel = model("Product", productSchema)