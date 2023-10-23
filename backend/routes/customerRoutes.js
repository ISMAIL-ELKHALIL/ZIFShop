const { Router } = require("express");
const router = Router();
const customerController = require("../controllers/customerController");
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
  message: "Too many requests, please try again after 15 min",
});

//? Customer Authentication
router.post("/login", limiter, customerController.loginCustomer);

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
