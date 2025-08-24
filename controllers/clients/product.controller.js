const Product = require("../../model/product.model");
module.exports.product = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: -1 });
  const newProducts = products.map((value) => {
    value.newPrice = (
      value.price *
      (1 - value.discountPercentage / 100)
    ).toFixed(0);
    return value;
  });
  res.render("./clients/pages/product/index.pug", {
    title: "Product",
    products: newProducts,
  });
};
