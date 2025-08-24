const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const { Schema } = mongoose;
const ProductCategorysSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number },
    slug: { type: String, slug: "title", unique: true },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    thumbnail: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    position: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);
const ProductCategory = mongoose.model(
  "Products-Categorys",
  ProductCategorysSchema,
  "products-categorys"
);
module.exports = ProductCategory;
