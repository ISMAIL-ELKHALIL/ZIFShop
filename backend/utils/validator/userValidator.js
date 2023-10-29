const { body, param, query } = require("express-validator");

const userValidator = (method) => {
  switch (method) {
    case "post":
      return [
        body("first_name").notEmpty().withMessage("First name is required"),
        body("last_name").notEmpty().withMessage("Last name is required"),
        body("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid email format"),
        body("role").notEmpty().withMessage("Role is required"),
        body("user_name").notEmpty().withMessage("Username is required"),
        body("password")
          .notEmpty()
          .withMessage("Password is required")
          .isStrongPassword()
          .withMessage(
            "Weak password, It should  Be at least 8 characters long. Include a combination of uppercase letters, lowercase letters, numbers, and special characters. Avoid common words, phrases, or easily guessable information"
          ),

        body("active")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];
    case "get":
      return [
        param("id").optional().isMongoId(),
        query("email").optional().notEmpty(),
      ];

    case "put":
      return [
        param("id").isMongoId(),
        body("first_name").notEmpty().withMessage("First name is required"),
        body("last_name").notEmpty().withMessage("Last name is required"),
        body("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid email format"),
        body("role").notEmpty().withMessage("Role is required"),
        body("user_name").notEmpty().withMessage("Username is required"),
        body("password")
          .notEmpty()
          .withMessage("Password is required")
          .isStrongPassword()
          .withMessage(
            "Weak password, It should  Be at least 8 characters long. Include a combination of uppercase letters, lowercase letters, numbers, and special characters. Avoid common words, phrases, or easily guessable information"
          ),

        body("active")
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];
    case "patch":
      return [
        param("id").isMongoId(),
        body("first_name")
          .optional()
          .notEmpty()
          .withMessage("First name is required"),
        body("last_name")
          .optional()
          .notEmpty()
          .withMessage("Last name is required"),
        body("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid email format"),
        body("role").optional().notEmpty().withMessage("Role is required"),
        body("user_name")
          .optional()
          .notEmpty()
          .withMessage("Username is required"),
        body("password")
          .optional()
          .notEmpty()
          .withMessage("Password is required")
          .isStrongPassword()
          .withMessage(
            "Weak password, It should  Be at least 8 characters long. Include a combination of uppercase letters, lowercase letters, numbers, and special characters. Avoid common words, phrases, or easily guessable information"
          ),

        body("active")
          .optional()
          .isBoolean()
          .withMessage("Active must be a boolean value"),
      ];
    case "delete":
      return [param("id").isMongoId()];
  }
};

module.exports = { userValidator };
