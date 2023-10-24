const { Router } = require("express");

const router = Router();
const { verifyJWT, checkRole } = require("../middlewares/verifyUserAuthAndRole");
const { subCategoriesController } = require("../controllers/subCategoryController");

router.post("/", subCategoriesController.createSubCategory);

router.get("/", subCategoriesController.getSubCategories);

router.get("/:id", subCategoriesController.getSubCategory);

router.get("/search", subCategoriesController.searchSubCategory);

router.put("/:id", subCategoriesController.updateSubCategory);

router.delete("/:id", subCategoriesController.deleteSubCategory);

module.exports = router;
