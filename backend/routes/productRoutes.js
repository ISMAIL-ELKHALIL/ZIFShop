const router = require("express").Router();
const productController = require("../controllers/productController");
const { validateInputs } = require("../middlewares/validateInputs");
const { upload } = require("../middlewares/uploadImage");

// Create a new product
router.post(
  "/",
  upload.single("product_image"),
  productController.createProduct
);

// List all products
router.get("/", productController.getAllProducts);

// Get a product by ID
router.get("/:id([0-9a-fA-F]{24})", productController.getProductById);

// Search for a product
router.get("/search", productController.searchProducts);

// Update a product
router.patch("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
