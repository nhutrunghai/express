const mongoose = require("mongoose");
const cartsSchema = new mongoose.Schema(
  {
    user_id: mongoose.Schema.Types.ObjectId,
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        stock: Number,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Carts = mongoose.model("Carts", cartsSchema, "carts");

module.exports = Carts;
