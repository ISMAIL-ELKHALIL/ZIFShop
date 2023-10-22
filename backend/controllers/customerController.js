//"use strict";

const { CustomerModel } = require("../models/customers");
const jwt = require("jsonwebtoken"); // For decoding JWT tokens
const bcrypt = require("bcrypt");

const customerController = {
  //Todo:Implementation for customer authentication
  //Todo: Ensure you validate the email and password, and respond with a token if successful

  login: async (req, res) => {
    const { email, password } = req.body;

    const customerExisted = await CustomerModel.findOne({ email });

    if (!customerExisted) {
      return res.status(404).send("Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      customerExisted.password
    );

    console.log("passwordStatus", isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(404).send("Invalid  password");
    }

    return res.status(202).send({
      status: 200,
      message: "login success",
      user: customerExisted,
    });
  },

  createCustomer: async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      const existingCustomer = await CustomerModel.findOne({ email: email });

      if (existingCustomer) {
        return res.status(400).json({ error: "Email already in use" });
      }

      // const hashedPassword = await bcrypt.hash(password, 10);

      const newCustomer = new CustomerModel({
        first_name,
        last_name,
        email,
        password,
        valid_account: false, //? You can send a validation email here
        active: false,
      });

      await newCustomer.save();

      return res.status(201).json(newCustomer);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Unable to create customer", msg: error.message });
    }
  },

  getAllCustomers: async (req, res) => {
    // Implementation for getting all customers with pagination and sorting
    // Ensure role-based access control
    try {
      const allCustomers = await CustomerModel.find();
      if (allCustomers.length === 0) {
        return res.status(404).send("no Customer found");
      }

      return res
        .status(201)
        .send({ Count: allCustomers.length, Customers: allCustomers });
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

  searchCustomers: async (req, res) => {
    try {
      // Extract the query parameters from the request
      const { query } = req.query;

      // Perform the search operation based on the 'query' parameter
      // You can use the query parameter to search for customers in  MongoDB collection
      const customers = await CustomerModel.find({
        $or: [
          { first_name: { $regex: query, $options: "i" } }, // Case-insensitive search on first_name
          { last_name: { $regex: query, $options: "i" } }, // Case-insensitive search on last_name
          { email: { $regex: query, $options: "i" } }, // Case-insensitive search on email
        ],
      });

      // Send the search results as a JSON response
      res.status(200).json(customers);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while searching for customers" });
    }
  },

  getCustomerById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send("The ID is required for Search");
    }

    try {
      const searchedCustomer = await CustomerModel.findById(id);

      return res.status(201).send(searchedCustomer);
    } catch (error) {
      return res.status(500).send({ error: e.message });
    }
  },

  validateCustomer: async (req, res) => {
    // Implementation for validating a customer's account
    // Ensure role-based access control
  },

  //? UPDATE CUSTOMER BY ID
  updateCustomer: async (req, res) => {
    // Implementation for updating a customer's data
    // Ensure role-based access control
    // Validate email uniqueness

    const { id } = req.params;
    const { password } = req.body;
    if (!id) {
      return res.status(404).send("ID is required for Updating Data");
    }
    try {
      const updatedCustomer = await CustomerModel.findByIdAndUpdate(
        id,
        {
          password: await bcrypt.hash(password, 10),
        },
        { new: true }
      );
      return res.status(202).send({ modifiedUser: updatedCustomer });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  //TODO Watch how to work with JWT

  deleteCustomer: async (req, res) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization;

      // Verify and decode the token to obtain the customer's ID
      const secretKey = "your-secret-key"; // Replace with your actual secret key
      const decoded = jwt.verify(token, secretKey);
      const customerId = decoded.customerId;

      // Check if the customer is allowed to delete their own data
      if (customerId !== req.params.id) {
        return res
          .status(403)
          .json({ error: "You are not authorized to perform this action." });
      }

      // You have the customer's ID; now you can proceed to delete or anonymize the data.
      // Example: To anonymize, you can set certain fields to default values (e.g., null or empty strings).

      const customer = await CustomerModel.findByIdAndDelete(customerId);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Optionally, you can respond with a success message
      res
        .status(200)
        .json({ message: "Customer data has been deleted or anonymized." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the customer data" });
    }
  },

  getCustomerProfile: async (req, res) => {
    // Implementation for getting a customer's profile
    // Ensure role-based access control
  },

  updateCustomerProfile: async (req, res) => {
    // Implementation for updating a customer's profile
    // Ensure role-based access control
    // Validate email uniqueness
  },
};

module.exports = customerController;
