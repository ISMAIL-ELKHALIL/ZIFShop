const router = require("express").Router();

const { categoriesController } = require("../controllers/categoryController");
const { validateInputs } = require("../middlewares/validateInputs");
router.post("/", categoriesController.createCategory);

router.get("/", categoriesController.getAllCategories);

router.get("/:id([0-9a-fA-F]{24})", categoriesController.getCategory);

router.get("/search", categoriesController.searchCategory);

router.put("/:id", categoriesController.updateCategory);

router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
