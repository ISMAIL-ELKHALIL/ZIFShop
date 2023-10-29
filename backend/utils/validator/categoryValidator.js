const { body, param } = require("express-validator");

const categoryValidator = (method) => {
  switch (method) {
    case "post":
      return [
        body("category_name")
          .notEmpty()
          .withMessage("Category name is required")
          .isString()
          .withMessage("Category name must be a string"),
        body("active")
          .notEmpty()
          .withMessage("Active is required")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];
    case "get":
      return [param("id").optional().isMongoId];

    case "put":
      return [
        param("id").isMongoId,
        body("category_name")
          .notEmpty()
          .withMessage("Category name is required")
          .isString()
          .withMessage("Category name must be a string"),
        body("active")
          .notEmpty()
          .withMessage("Active is required")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];

    case "patch":
      return [
        body("category_name")
          .optional()
          .notEmpty()
          .withMessage("Category name is required")
          .isString()
          .withMessage("Category name must be a string"),
        body("active")
          .optional()
          .notEmpty()
          .withMessage("Active is required")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];

    case "delete":
      return [param("id").isMongoId];

    default:
      return [];
  }
};

module.exports = { categoryValidator };
