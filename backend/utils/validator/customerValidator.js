const { body, param } = require("express-validator");

const customerValidator = (method) => {
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
        body("password")
          .notEmpty()
          .withMessage("Password is required")
          .isStrongPassword()
          .withMessage(
            "Weak password, It should  Be at least 8 characters long. Include a combination of uppercase letters, lowercase letters, numbers, and special characters. Avoid common words, phrases, or easily guessable information"
          ),
      ];
    case "get":
      return [param("id").optional().isMongoId()];

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
        body("password")
          .notEmpty()
          .withMessage("Password is required")
          .isStrongPassword()
          .withMessage(
            "Weak password, It should  Be at least 8 characters long. Include a combination of uppercase letters, lowercase letters, numbers, and special characters. Avoid common words, phrases, or easily guessable information"
          ),
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
          .optional()
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Invalid email format"),
        body("password")
          .optional()
          .notEmpty()
          .withMessage("Password is required")
          .isStrongPassword()
          .withMessage(
            "Weak password, It should  Be at least 8 characters long. Include a combination of uppercase letters, lowercase letters, numbers, and special characters. Avoid common words, phrases, or easily guessable information"
          ),
      ];
    case "delete":
      return [param("id").isMongoId()];
  }
};

module.exports = { customerValidator };
