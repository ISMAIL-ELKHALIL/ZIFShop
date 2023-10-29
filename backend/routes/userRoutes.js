const router = require("express").Router();

const { usersController } = require("../controllers/userController");
const { userValidator } = require("../utils/validator/userValidator");
const { validateInputs } = require("../middlewares/validateInputs");
// Login endpoint
router.post(
  "/login",
  userValidator("post"),
  validateInputs,
  usersController.loginUser
);

// Create a new user endpoint
router.post("/", usersController.createUser);

// Get all users endpoint
router.get("/", usersController.getAllUsers);

// Get a user by ID endpoint
router.get("/:id([0-9a-fA-F]{24})", usersController.getUserById);
// Search for a user endpoint
router.get("/search", usersController.searchUser);

// Update user data endpoint
router.put("/:id", usersController.updateUser);

// Delete a user endpoint
router.delete("/:id", usersController.deleteUser);

module.exports = router;
