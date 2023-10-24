// controllers/categoryController.js
const slugify = require("slugify");
const { SubCategoryModel } = require("../models/subcategoriesModel"); // Import your Categories model

// Controller for handling subcategories-related API endpoints
const subCategoriesController = {
  createSubCategory: async (req, res) => {
    try {
      //TODO check if the subcategrory already exists
      const { subcategory_name, category_id } = req.body;
      const newCategory = await SubCategoryModel.create({
        subcategory_name,
        slug: slugify(subcategory_name),
        category_id,
      });
      return res.status(201).json({ data: newCategory });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getSubCategories: async (req, res) => {
    try {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 3;
      const skip = (page - 1) * limit;

      const subCategories = await SubCategoryModel.find({})
        .skip(skip)
        .limit(limit);
      return res
        .status(200)
        .json({ results: subCategories.length, page, subCategories });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getSubCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const subCategory = await SubCategoryModel.findById(id);

      if (!subCategory) {
        return res
          .status(404)
          .json({ msg: `No subCategory for this id ${id}` });
      } else {
        return res.status(200).json({ subCategory });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  searchSubCategory: async (req, res) => {},

  updateSubCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { subcategory_name } = req.body;

      const subCategory = await SubCategoryModel.findByIdAndUpdate(
        { _id: id },
        { subcategory_name, slug: slugify(subcategory_name) },
        { new: true }
      );
      if (!subCategory) {
        return res.status(404).json({ msg: `No subcategory for this id ${id}` });
      } else {
        return res.status(200).json({ subCategory });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteSubCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const subCategory = await SubCategoryModel.findByIdAndDelete(id);
      if (!subCategory) {
        return res.status(404).json({ msg: `No subcategory for this id ${id}` });
      } else {
        return res.status(200).json({ subCategory });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
module.exports = { subCategoriesController };
