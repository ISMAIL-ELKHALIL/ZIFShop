const { Router } = require("express");
const { usersController } = require("../controllers/userController");

const { verifyJWT, checkRole } = require("../middlewares/verifyUserAuthAndRole");

const router = Router();

// Login endpoint
router.post("/login", usersController.loginUser);

// Create a new user endpoint
router.post("/", verifyJWT, checkRole, usersController.createUser);

// Get all users endpoint
router.get("/", usersController.getAllUsers);

// Get a user by ID endpoint
router.get("/:id", usersController.getUserById);

// Search for a user endpoint
router.get("/search", usersController.searchUser);

// Update user data endpoint
router.put("/:id", usersController.updateUser);

// Delete a user endpoint
router.delete("/:id", usersController.deleteUser);


module.exports = router;
