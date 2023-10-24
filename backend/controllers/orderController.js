const { UserModel, OrderModel } = require("../models/ordersModel");

const orderController = {
  //? CREATE NEW ORDER

  createOrder: async (req, res) => {
    try {
      const { customer_id, order_items, price, cart_total_price, status } =
        req.body;
      const newOrder = await OrderModel.create({
        customer_id,
        order_items,
        price,
        order_date: new Date().toLocaleString(),
        cart_total_price,
        status,
      });
      return res.status(200).send(newOrder);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  //? GET ALL ORDERS

  getAllOrders: async (req, res) => {
    try {
      // Retrieve a list of orders, limiting to 10 orders per page
      const page = req.query.page || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const orders = await OrderModel.find().skip(skip).limit(limit).exec();

      // You need to fetch customer information as well, as per the rules
      res.status(200).json({ Count: orders.length, Data: orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  //? GET ORDER BY ID

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id);

      if (!order) {
        return res.status(404).json({
          status: 404,
          message: "invalid order id",
        });
      }

      // You also need to retrieve the customer's first name and last name

      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  //? UPDATE ORDER'S STATUS

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await OrderModel.findById(id);

      if (!order) {
        return res.status(404).json({
          status: 404,
          message: "invalid order id",
        });
      }

      // Update the order status
      order.status = String(status).toLowerCase();
      const updatedOrder = await order.save();

      res.status(200).json({
        status: 200,
        message: "order status updated successfully",
        updatedOrder: updatedOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
