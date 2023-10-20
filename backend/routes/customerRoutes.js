const { Router } = require("express");
const router = Router();
const customerController = require("../controllers/customerController");

//? Customer Authentication
router.post("/login", customerController.login);

//? Create a new Customer Account
router.post("/", customerController.createCustomer);

//? Get all Customers
router.get("/", customerController.getAllCustomers);

//? Search for a Customer
router.get("/search", customerController.searchCustomers);

//? Get a Customer by ID
router.get("/:id", customerController.getCustomerById);

//? Validate Customer's Account
router.put("/validate/:id", customerController.validateCustomer);

//? Update Customer's Data
router.put("/:id", customerController.updateCustomer);

//? Delete Customer's Account
router.delete("/delete/:id", customerController.deleteCustomer);

//? Get Customer's Profile
router.get("/profile", customerController.getCustomerProfile);

//? Update Customer's Profile
router.patch("/update/:id", customerController.updateCustomerProfile);

module.exports = router;

