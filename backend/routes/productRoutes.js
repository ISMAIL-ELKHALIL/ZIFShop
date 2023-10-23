const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productController"); // Make sure the import path matches your project structure

// Create a new product
router.post("/", productController.createProduct);

// List all products
router.get("/", productController.getAllProducts);

// Search for a product
router.get("/search", productController.searchProducts);

// Get a product by ID
router.get("/:id", productController.getProductById);

// Update a product
router.patch("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
