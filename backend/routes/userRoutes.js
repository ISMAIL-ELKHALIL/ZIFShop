const { Router } = require("express");
const { usersController } = require("../controllers/userController");
const router = Router();

// Login endpoint
router.post("/login", usersController.loginUser);

// Create a new user endpoint
router.post("/", usersController.createUser);

// Get all users endpoint
router.get("/");

// Get a user by ID endpoint
router.get("/:id");

// Search for a user endpoint
router.get("/search");

// Update user data endpoint
router.put("/:id");

// Delete a user endpoint
router.delete("/:id");

module.exports = router;
