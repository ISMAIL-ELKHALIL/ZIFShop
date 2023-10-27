// controllers/categoryController.js
const slugify = require("slugify");
const { CategoriesModel } = require("../models/categoriesModel"); // Import your Categories model
const { SubCategoryModel } = require("../models/subcategoriesModel")

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

  getCategories: async (req, res) => {
    try {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 3;
      const skip = (page - 1) * limit;

      const categories = await CategoriesModel.find({}).skip(skip).limit(limit);
      return res
        .status(200)
        .json({ results: categories.length, page, categories });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoriesModel.findById(id);

      if (!category) {
        return res.status(404).json({ msg: `No category for this id ${id}` });
      } else {
        return res.status(200).json({ category });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  searchCategory: async (req, res) => {},

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name } = req.body;

      const category = await CategoriesModel.findByIdAndUpdate(
        { _id: id },
        { category_name, slug: slugify(category_name) },
        { new: true }
      );
      if (!category) {
        return res.status(404).json({ msg: `No category for this id ${id}` });
      } else {
        return res.status(200).json({ category });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    /*     try {
      const { id } = req.params;

      const category = await CategoriesModel.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ msg: `No category for this id ${id}` });
      } else {
        return res.status(200).json({ category });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } */

    try {
      const { id } = req.params;
    
      const category = await CategoriesModel.findById(id);
      if (!category) {
        return res.status(404).json({ msg: `No category for this id ${id}` });
      }
    
      const subcategories = await SubCategoryModel.find({ category_id: id });
      if (subcategories.length > 0) {
        return res.status(400).json({ msg:
            "Unable to delete this category, subcategories are attached to it."
        });
      }
    
      await category.deleteOne();
    
      res.status(200).json({msg: "Category successfully deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
module.exports = { categoriesController };

