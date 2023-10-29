const { body, param } = require("express-validator");

const subCategoryValidator = (method) => {
  switch (method) {
    case "post":
      return [
        body("subcategory_name")
          .notEmpty()
          .withMessage("Subcategory name is required")
          .isString()
          .withMessage("Subcategory name must be a string"),
        body("category_id")
          .notEmpty()
          .withMessage("Category ID is required")
          .isMongoId()
          .withMessage("Category ID must be a MongoID"),
      ];
    case "put":
      return [
        param("id").isMongoId(),
        body("subcategory_name")
          .notEmpty()
          .withMessage("Subcategory name is required")
          .isString()
          .withMessage("Subcategory name must be a string"),
        body("category_id")
          .notEmpty()
          .withMessage("Category ID is required")
          .isMongoId()
          .withMessage("Category ID must be a MongoID"),
      ];
    case "patch":
      return [
        param("id").isMongoId(),
        body("subcategory_name")
          .optional()
          .notEmpty()
          .withMessage("Subcategory name is required")
          .isString()
          .withMessage("Subcategory name must be a string"),
        body("category_id")
          .optional()
          .notEmpty()
          .withMessage("Category ID is required")
          .isMongoId()
          .withMessage("Category ID must be a MongoID"),
      ];
    case "get":
      return [param("id").optional().isMongoId()];
    case "delete":
      return [param("id").isMongoId()];
  }
};

module.exports = { subCategoryValidator };
