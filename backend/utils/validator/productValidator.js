const { body, param } = require("express-validator");

const productValidator = (method) => {
  switch (method) {
    case "post":
      return [
        body("sku")
          .notEmpty()
          .withMessage("SKU is required")
          .isString()
          .withMessage("SKU must be a string"),
        body("product_image")
          .notEmpty()
          .withMessage("Product image is required"),
        body("product_name").notEmpty().withMessage("Product name is required"),
        body("subcategory_id")
          .notEmpty()
          .isString()
          .withMessage("Subcategory ID must be a string"),
        body("short_description")
          .notEmpty()
          .withMessage("Short description is required"),
        body("long_description")
          .notEmpty()
          .withMessage("Long description is required"),
        body("price")
          .notEmpty()
          .withMessage("Price is required")
          .isNumeric()
          .withMessage("Price must be a number"),
        body("discount_price")
          .optional()
          .isNumeric()
          .withMessage("Discount price must be a number"),
        body("options")
          .optional()
          .isArray()
          .withMessage("Options must be an array"),
        body("active")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];
    case "get":
      return [param("id").isMongoId()];

    case "put":
      return [
        param("id").isMongoId(),
        body("sku")
          .notEmpty()
          .withMessage("SKU is required")
          .isString()
          .withMessage("SKU must be a string"),
        body("product_image")
          .notEmpty()
          .withMessage("Product image is required"),
        body("product_name").notEmpty().withMessage("Product name is required"),
        body("subcategory_id")
          .notEmpty()
          .isString()
          .withMessage("Subcategory ID must be a string"),
        body("short_description")
          .notEmpty()
          .withMessage("Short description is required"),
        body("long_description")
          .notEmpty()
          .withMessage("Long description is required"),
        body("price")
          .notEmpty()
          .withMessage("Price is required")
          .isNumeric()
          .withMessage("Price must be a number"),
        body("discount_price")
          .optional()
          .isNumeric()
          .withMessage("Discount price must be a number"),
        body("options")
          .optional()
          .isArray()
          .withMessage("Options must be an array"),
        body("active")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];

    case "patch":
      return [
        param("id").isMongoId(),
        body("sku")
          .optional()
          .notEmpty()
          .withMessage("SKU is required")
          .isString()
          .withMessage("SKU must be a string"),
        body("product_image")
          .notEmpty()
          .withMessage("Product image is required"),
        body("product_name").notEmpty().withMessage("Product name is required"),
        body("subcategory_id")
          .notEmpty()
          .isString()
          .withMessage("Subcategory ID must be a string"),
        body("short_description")
          .notEmpty()
          .withMessage("Short description is required"),
        body("long_description")
          .notEmpty()
          .withMessage("Long description is required"),
        body("price")
          .notEmpty()
          .withMessage("Price is required")
          .isNumeric()
          .withMessage("Price must be a number"),
        body("discount_price")
          .optional()
          .isNumeric()
          .withMessage("Discount price must be a number"),
        body("options")
          .optional()
          .isArray()
          .withMessage("Options must be an array"),
        body("active")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];
  }
};

module.exports = { productValidator };
