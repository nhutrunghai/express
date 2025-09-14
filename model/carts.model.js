const mongoose = require("mongoose");
const cartsSchema = new mongoose.Schema(
  {
    user_id:mongoose.Schema.Types.ObjectId,
    products:[
        {
            product_id:mongoose.Schema.Types.ObjectId,
            stock:Number
        }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Carts = mongoose.model("Carts", cartsSchema, "carts");

module.exports = Carts;
