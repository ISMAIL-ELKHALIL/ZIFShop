const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    customer_id: { type: String, required: true },
    order_items: { type: Array },
    order_date: { type: Date, required: true },
    price: { type: Number, required: true },
    cart_total_price: { type: Number, required: true },
    status: { type: String, default: "Open" },
  },
  { timestamps: true }
);

const OrderModel = model("Order", orderSchema);

module.exports = { OrderModel };
