const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    sku: { type: String, required: true },
    product_image: { type: String, required: true },
    product_name: { type: String, required: true },
    subcategory_id: { type: String },
    short_description: { type: String },
    long_description: { type: String },
    price: { type: Number, required: true },
    discount_price: { type: Number },
    options: { type: Array },
    active: { type: Boolean,},
});

const orderModel = model("Order", orderSchema);

module.exports = orderModel;
