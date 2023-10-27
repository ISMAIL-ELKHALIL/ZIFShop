const { Router } = require("express");

const {
  verifyJWT,
  checkRole,
} = require("../middlewares/verifyUserAuthAndRole");
const {
  subCategoriesController,
} = require("../controllers/subCategoryController");


// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = Router({ mergeParams: true });


router.post("/", subCategoriesController.createSubCategory);

router.get("/", subCategoriesController.getSubCategories);

router.get("/:id", subCategoriesController.getSubCategory);

router.get("/search", subCategoriesController.searchSubCategory);

router.put("/:id", subCategoriesController.updateSubCategory);

router.delete("/:id", subCategoriesController.deleteSubCategory);

module.exports = router;
