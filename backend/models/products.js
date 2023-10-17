const { Schema, model } = require("mongoose");


const productSchema = new Schema({
    sku: { type: String },
    product_image: { type: String },
    product_name: { type: String },
    subcategory_id: { type: String },
    short_description: { type: String },
    long_description: { type: String },
    price: { type: Number },
    discount_price: { type: Number },
    options: { type: Array },
    active: { type: Boolean },
})

const productModel = model("Product", productSchema)