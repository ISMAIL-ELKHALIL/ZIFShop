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
      // Ensure only users with admin and manager roles can list orders
      const userRole = req.user.role; // Assuming you have user information in req.user

      if (userRole !== "admin" && userRole !== "manager") {
        return res.status(403).json({ error: "Access denied" });
      }

      // Retrieve a list of orders, limiting to 10 orders per page
      const page = req.query.page || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const orders = await OrderModel.find().skip(skip).limit(limit).exec();

      // You need to fetch customer information as well, as per the rules

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Error listing orders" });
    }
  },

  //? GET ORDER BY ID

  getOrderById: async (req, res) => {
    try {
      // Ensure only users with admin and manager roles can get order details
      const userRole = req.user.role; // Assuming you have user information in req.user

      if (userRole !== "admin" && userRole !== "manager") {
        return res.status(403).json({ error: "Access denied" });
      }

      const orderId = req.params.id;
      const order = await OrderModel.findById(orderId);

      if (!order) {
        return res
          .status(404)
          .json({ error: "No order found with the provided ID" });
      }

      // You also need to retrieve the customer's first name and last name

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: "Error getting the order" });
    }
  },

  //? UPDATE ORDER'S STATUS

  updateOrderStatus: async (req, res) => {
    try {
      // Ensure only users with admin and manager roles can update order data
      const userRole = req.user.role; // Assuming you have user information in req.user

      if (userRole !== "admin" && userRole !== "manager") {
        return res.status(403).json({ error: "Access denied" });
      }

      const orderId = req.params.id;
      const { status } = req.body;

      const order = await OrderModel.findById(orderId);

      if (!order) {
        return res
          .status(404)
          .json({ error: "No order found with the provided ID" });
      }

      // Update the order status
      order.status = status;
      const updatedOrder = await order.save();

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Error updating the order status" });
    }
  },
};

module.exports = orderController;
