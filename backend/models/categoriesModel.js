const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    active: { type: Boolean, required: true, default: false },
    // A and B => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const CategoriesModel = model("Category", categorySchema);

module.exports = { CategoriesModel };
