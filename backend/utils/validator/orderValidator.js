const { body, param } = require("express-validator");

const orderValidator = (method) => {
  switch (method) {
    case "post":
      return [
        body("customer_id").notEmpty().withMessage("Customer ID is required"),
        body("order_items")
          .isArray()
          .withMessage("Order items must be an array"),
        body("order_date")
          .notEmpty()
          .withMessage("Order date is required")
          .isISO8601()
          .withMessage("Invalid date format"),
        body("price")
          .notEmpty()
          .withMessage("Price is required")
          .isNumeric()
          .withMessage("Price must be a number"),
        body("cart_total_price")
          .notEmpty()
          .withMessage("Cart total price is required")
          .isNumeric()
          .withMessage("Cart total price must be a number"),
        body("status").isString().withMessage("Status must be a string"),
      ];
    case "get":
      return [param("id").optional().isMongoId()];
    case "put":
      return [
        param("id").isMongoId(),
        body("customer_id").notEmpty().withMessage("Customer ID is required"),
        body("order_items")
          .isArray()
          .withMessage("Order items must be an array"),
        body("order_date")
          .notEmpty()
          .withMessage("Order date is required")
          .isISO8601()
          .withMessage("Invalid date format"),
        body("price")
          .notEmpty()
          .withMessage("Price is required")
          .isNumeric()
          .withMessage("Price must be a number"),
        body("cart_total_price")
          .notEmpty()
          .withMessage("Cart total price is required")
          .isNumeric()
          .withMessage("Cart total price must be a number"),
        body("status").isString().withMessage("Status must be a string"),
      ];
    case "patch":
      return [
        param("id").isMongoId(),
        body("customer_id")
          .optional()
          .notEmpty()
          .withMessage("Customer ID is required"),
        body("order_items")
          .optional()
          .isArray()
          .withMessage("Order items must be an array"),
        body("order_date")
          .optional()
          .notEmpty()
          .withMessage("Order date is required")
          .isISO8601()
          .withMessage("Invalid date format"),
        body("price")
          .optional()
          .notEmpty()
          .withMessage("Price is required")
          .isNumeric()
          .withMessage("Price must be a number"),
        body("cart_total_price")
          .optional()
          .notEmpty()
          .withMessage("Cart total price is required")
          .isNumeric()
          .withMessage("Cart total price must be a number"),
        body("status")
          .optional()
          .isString()
          .withMessage("Status must be a string"),
      ];
    case "delete":
      return [param("id").isMongoId()];
  }
};

module.exports = { orderValidator };
