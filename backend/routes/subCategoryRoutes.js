const router = require("express").Router();
const { validateInputs } = require("../middlewares/validateInputs");
const {
  subCategoriesController,
} = require("../controllers/subCategoryController");

router.post("/", subCategoriesController.createSubCategory);

router.get("/", subCategoriesController.getSubCategories);

router.get("/:id([0-9a-fA-F]{24})", subCategoriesController.getSubCategory);

router.get("/search", subCategoriesController.searchSubCategory);

router.put("/:id", subCategoriesController.updateSubCategory);

router.delete("/:id", subCategoriesController.deleteSubCategory);

module.exports = router;
