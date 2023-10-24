const { Router } = require("express");

const router = Router();
const { verifyJWT, checkRole } = require("../middlewares/verifyUserAuthAndRole");
const { categoriesController } = require("../controllers/categoryController");

router.post("/", categoriesController.createCategory);

router.get("/", categoriesController.getCategories);

router.get("/:id", categoriesController.getCategory);

router.get("/search", categoriesController.searchCategory);

router.put("/:id", categoriesController.updateCategory);

router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
