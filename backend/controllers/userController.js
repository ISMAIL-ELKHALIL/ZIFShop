// controllers/usersController.js
const { UserModel } = require("../models/usersModel"); // Import your User model
const jwt = require("jsonwebtoken"); // For decoding JWT tokens
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config/env");
const { SALT } = require("../config/env");
const bcrypt = require("bcrypt");


// User Controller for handling user-related API endpoints
const usersController = {
  // Middleware for user authentication (You'll need to implement this)
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      //? Find the User by email
      const existedUser = await UserModel.findOne({ email });

      if (!existedUser) {
        return res.status(404).send("Invalid email or password");
      }
      //? Verify User password
      const isPasswordMatch = await bcrypt.compare(
        password,
        existedUser.password
      );

      console.log("passwordStatus", isPasswordMatch);

      if (!isPasswordMatch) {
        return res.status(404).send("Invalid  password");
      }

      //? Create JWTs

      const accessToken = jwt.sign(
        {
          _id: existedUser._id,
          email: existedUser.email,
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );

      const refreshToken = jwt.sign(
        {
          _id: existedUser._id,
          email: existedUser.email,
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

  // Route handler for adding a new user
  createUser: async (req, res) => {
    try {
      const { first_name, last_name, user_name, email, password, role } =
        req.body;
      const existedUser = await UserModel.findOne({ email: email });

      if (existedUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      //? You can also use  new UserModel({}) with await save();
      const newUser = await UserModel.create({
        first_name,
        last_name,
        email,
        role,
        password,
        user_name,
      });

      //await newUser.save();

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Unable to create customer", msg: error.message });
    }
  },

  // Route handler for getting all users
  getAllUsers: (req, res) => {
    // Implement logic to retrieve all users from the database and send the list as a response.
  },

  // Route handler for getting a user by ID
  getUserById: (req, res) => {
    const userId = req.params.id;
    // Implement logic to find a user by ID and send it as a response.
  },

  // Route handler for searching for a user
  searchUser: (req, res) => {
    const query = req.query.query;
    // Implement logic to search for users based on the provided query.
  },

  // Route handler for updating a user's data
  updateUser: (req, res) => {
    const userId = req.params.id;
    // Implement logic to update a user's data based on the request body.
  },

  // Route handler for deleting a user
  deleteUser: (req, res) => {
    const userId = req.params.id;
    // Implement logic to delete a user by ID from the database.
  },
};
module.exports = { usersController };
