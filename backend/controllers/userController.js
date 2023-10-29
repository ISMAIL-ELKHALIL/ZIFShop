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
          role: existedUser.role,
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        {
          _id: existedUser._id,
          email: existedUser.email,
          role: existedUser.role,
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
        .json({ error: "Unable to create user", msg: error.message });
    }
  },

  // Route handler for getting all users
  getAllUsers: async (req, res) => {
    // Implementation for getting all Users with pagination and sorting
    // Ensure role-based access control
    try {
      const allUsers = await UserModel.find();
      if (allUsers.length === 0) {
        return res.status(404).send("no user found");
      }

      return res.status(201).send({ Count: allUsers.length, Users: allUsers });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // Route handler for getting a user by ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send("The ID is required for Search");
    }

    try {
      const searchedUser = await UserModel.findById(id);

      return res.status(201).send(searchedUser);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // Route handler for searching for a user
  searchUser: async (req, res) => {
    // Extract the query parameters from the request
    const { first_name, last_name, email } = req.query;
    //Todo : add error handling for empty queries
    try {
      // Convert to string because the regex in mongoDB must be a String
      const firstName = String(first_name);
      const lastName = String(last_name);
      const userEmail = String(email);

      console.log(req.query.first_name);
      // Perform the search operation based on the 'query' parameters
      const searchedUser = await UserModel.find({
        $or: [
          { first_name: { $regex: firstName, $options: "i" } }, // Case-insensitive search on first_name
          { last_name: { $regex: lastName, $options: "i" } }, // Case-insensitive search on last_name
          { email: { $regex: userEmail, $options: "i" } }, // Case-insensitive search on email
        ],
      });

      // Send the search results as a JSON response
      return res.status(200).json(searchedUser);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while searching for users" });
    }
  },

  // Route handler for updating a user's data
  updateUser: async (req, res) => {
    // Implementation for updating a user's data
    // Ensure role-based access control
    // Validate email uniqueness

    const { id } = req.params;
    const { password } = req.body;
    if (!id) {
      return res.status(404).send("ID is required for Updating Data");
    }
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          password: await bcrypt.hash(password, SALT),
        },
        { new: true }
      );
      return res.status(202).send({ modifiedUser: updatedUser });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  // Route handler for deleting a user
  //? DELETE user
  deleteUser: async (req, res) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization || req.headers.Authorization;
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
      const userId = decoded._id;

      // Check if the user is allowed to delete their own data
      if (userId !== req.params.id) {
        return res
          .status(403)
          .json({ error: "You are not authorized to perform this action." });
      }

      // You have the user's ID; now you can proceed to delete or anonymize the data.
      // Example: To anonymize, you can set certain fields to default values (e.g., null or empty strings).

      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Optionally, you can respond with a success message
      return res
        .status(200)
        .json({ message: "User data has been deleted or anonymized." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the user data" });
    }
  },
};
module.exports = { usersController };
