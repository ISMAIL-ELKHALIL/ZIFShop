// controllers/categoryController.js
const slugify = require("slugify");
const { CategoriesModel } = require("../models/categoriesModel"); // Import your Categories model

// Controller for handling categories-related API endpoints
const categoriesController = {
  createCategory: async (req, res) => {
    try {
      //TODO check if the category already exists
      const { category_name } = req.body;
      const newCategory = await CategoriesModel.create({
        category_name,
        slug: slugify(category_name),
      });
      return res.status(201).json({ data: newCategory });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCategories: async (req, res) => {},

  getCategory: async (req, res) => {},

  searchCategory: async (req, res) => {},

  updateCategory: async (req, res) => {},

  deleteCategory: async (req, res) => {},
};
module.exports = { categoriesController };
