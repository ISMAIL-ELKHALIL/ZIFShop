const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    customer_id: { type: String, required: true },
    order_items: [],
    order_date: { type: Date, required: true },
    price: { type: Number, required: true },
    cart_total_price: { type: Number, required: true },
    status: { type: Boolean },
});

const orderModel = model("Order", orderSchema);

module.exports = orderModel;
