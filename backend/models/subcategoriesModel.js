const { Schema, model, mongoose } = require("mongoose");

const subCategorySchema = new Schema(
  {
    subcategory_name: {
      type: String,
      unique: true,
      require: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SubCategoryModel = model("SubCategory", subCategorySchema);

module.exports = { SubCategoryModel };
