const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater"); // đây là thư viện tự tạo slug trong moongso
mongoose.plugin(slug);
const { Schema } = mongoose;
const productSchemas = new Schema(
  {
    title: String,
    slug: { type: String, slug: "title", unique: true },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Products-Categorys",
    },
    featured: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    createdAt: Date,
    deleted_at: Date,
  },
  { versionKey: false, timestamps: true }
);
const Product = mongoose.model("Product", productSchemas, "products");
module.exports = Product;

// Trong MongoDB, Date (BSON Date) chiếm 8 bytes (64-bit), tức cũng là int64 timestamp bên trong.

// Nếu bạn tự lưu timestamp dạng int (NumberLong) → nó cũng 8 bytes.
// 👉 Nên chẳng tiết kiệm gì cả, cả hai đều nặng như nhau.
