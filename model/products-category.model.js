const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const { Schema } = mongoose;
const ProductCategorysSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    slug: { type: String, slug: "title", unique: true },
    thumbnail: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    position: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);
const ProductCategory = mongoose.model(
  "Products-Categorys",
  ProductCategorysSchema,
  "products-categorys"
);
module.exports = ProductCategory;
