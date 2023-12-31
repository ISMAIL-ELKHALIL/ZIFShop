//"use strict";
const { CustomerModel } = require("../models/customersModel");
const jwt = require("jsonwebtoken"); // For decoding JWT tokens
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config/env");
const { SALT } = require("../config/env");

const customerController = {
  //Todo:Implementation for customer authentication
  //Todo: Ensure you validate the email and password, and respond with a token if successful

  //? LOGIN CUSTOMER

  loginCustomer: async (req, res) => {
    const { email, password } = req.body;

    try {
      //? Find the customer by email
      const existedCustomer = await CustomerModel.findOne({ email });

      if (!existedCustomer) {
        return res.status(404).send("Invalid email or password");
      }
      //? Verify customer password
      const isPasswordMatch = await bcrypt.compare(
        password,
        existedCustomer.password
      );

      console.log("passwordStatus", isPasswordMatch);

      if (!isPasswordMatch) {
        return res.status(404).send("Invalid  password");
      }

      //?Check if the customer has activated his account

      if (existedCustomer.valid_account === false) {
        return res.status(404).send("Please confirm your email");
      }

      //? Create JWTs

      const accessToken = jwt.sign(
        {
          _id: existedCustomer._id,
          email: existedCustomer.email,
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );

      const refreshToken = jwt.sign(
        {
          _id: existedCustomer.id,
          email: existedCustomer.email,
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).send({
        status: 200,
        message: "Login success",
        ACCESS_TOKEN: accessToken,
        REFRESH_TOKEN: refreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  //? CREATE CUSTOMER

  createCustomer: async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      const isCustomerExisted = await CustomerModel.findOne({ email: email });

      if (isCustomerExisted) {
        return res.status(400).json({ error: "Email already in use" });
      }

      //? You can also use  new CustomerModel({}) with await save();
      const newCustomer = await CustomerModel.create({
        first_name,
        last_name,
        email,
        password,
        valid_account: false, //? You can send a validation email here
        active: false,
      });

      //await newCustomer.save();

      console.log("by ___ID", newCustomer._id);
      console.log("by ID", newCustomer.id);
      return res.status(201).json(newCustomer);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Unable to create customer", msg: error.message });
    }
  },

  //? GET ALL CUSTOMERS

  getAllCustomers: async (req, res) => {
    // Implementation for getting all customers with pagination and sorting
    // Ensure role-based access control
    try {
      // Retrieve a list of Customers, limiting to 10 orders per page
      const page = req.query.page || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const allCustomers = await CustomerModel.find()
        .skip(skip)
        .limit(limit)
        .exec();
      if (allCustomers.length === 0) {
        return res.status(404).send("no Customer found");
      }

      return res
        .status(201)
        .send({ Count: allCustomers.length, Customers: allCustomers });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: e.message });
    }
  },

  //? SEARCH CUSTOMERS

  searchCustomers: async (req, res) => {
    // Extract the query parameters from the request
    try {
      const { first_name, last_name, email } = req.query;
      //Todo : add error handling for empty queries
      // Convert to string because the regex in mongoDB must be a String
      const firstName = String(first_name);
      const lastName = String(last_name);
      const customerEmail = String(email);

      console.log(req.query.first_name);
      // Perform the search operation based on the 'query' parameters
      const searchedCustomers = await CustomerModel.find({
        $or: [
          { first_name: { $regex: firstName, $options: "i" } }, // Case-insensitive search on first_name
          { last_name: { $regex: lastName, $options: "i" } }, // Case-insensitive search on last_name
          { email: { $regex: customerEmail, $options: "i" } }, // Case-insensitive search on email
        ],
      });

      // Send the search results as a JSON response
      return res.status(200).json(searchedCustomers);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while searching for customers" });
    }
  },
  //? GET CUSTOMER BY ID

  getCustomerById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send("The ID is required for Search");
    }

    try {
      const searchedCustomer = await CustomerModel.findById(id);

      return res.status(201).send(searchedCustomer);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: e.message });
    }
  },
  //? Validate Customer Email

  validateCustomer: async (req, res) => {
    // Implementation for validating a customer's account
    // Todo: Use nodeMail to send a
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
          password: await bcrypt.hash(password, SALT),
        },
        { new: true }
      );
      return res.status(202).send({ modifiedUser: updatedCustomer });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  //? DELETE CUSTOMER

  deleteCustomer: async (req, res) => {
    /*     // Extract the token from the request headers
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
      } */

    // You have the customer's ID; now you can proceed to delete or anonymize the data.
    // Example: To anonymize, you can set certain fields to default values (e.g., null or empty strings).

    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).send("ID is required for deletion");
      }

      const customer = await CustomerModel.findByIdAndDelete(id);
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
  //? GET CUSTOMER PROFILE

  getCustomerProfile: async (req, res) => {
    // Implementation for getting a customer's profile
    // Ensure role-based access control
  },
  //? UPDATE CUSTOMER PROFILE

  updateCustomerProfile: async (req, res) => {
    // Implementation for updating a customer's profile
    // Ensure role-based access control
    // Validate email uniqueness
  },
};

module.exports = customerController;
