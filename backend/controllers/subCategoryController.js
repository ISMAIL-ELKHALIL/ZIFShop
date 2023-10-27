// controllers/categoryController.js
const mongoose = require("mongoose");
const slugify = require("slugify");
const { SubCategoryModel } = require("../models/subcategoriesModel"); // Import your SubCategories model
const { CategoriesModel } = require("../models/categoriesModel"); // Import your Categories model

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
    console.log("GET / handler in subCategoryRoutes reached");
    try {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 20;
      const skip = (page - 1) * limit;

      // Nested route
      // GET /v1/categories/:categoryId/subcategories
      /*       let filterObject = {};
      if (req.params.categoryId)
        filterObject = { category_id: req.params.categoryId }; */

      let filterObject = {};
      if (req.params.categoryId)
        filterObject = {
          category_id: new mongoose.Types.ObjectId(req.params.categoryId),
        };

      /*         const subCategories = await SubCategoryModel.find(filterObject)
        .skip(skip)
        .limit(limit); */
      //.populate({ path: 'category', select: 'name -_id' });

      const subCategories = await SubCategoryModel.aggregate([
        {
          $match: filterObject,
        },
        {
          $lookup: {
            from: "categories", // Collection name for categories
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            _id: 1,
            subcategory_name: 1,
            slug: 1,
            category: {
              _id: "$category._id",
              category_name: "$category.category_name",
            },
            createdAt: 1,
            updatedAt: 1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);

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
        return res
          .status(404)
          .json({ msg: `No subcategory for this id ${id}` });
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
        return res
          .status(404)
          .json({ msg: `No subcategory for this id ${id}` });
      } else {
        return res.status(200).json({ subCategory });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
module.exports = { subCategoriesController };
