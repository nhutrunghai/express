const Product = require("../../model/product.model");
module.exports.home = async (req, res) => {
  let ProductsFeatured = await Product.find({
    featured: true,
    status: "active",
    deleted: false,
  })
    .sort({ position: "desc" })
    .limit(10)
    .lean();
  ProductsFeatured = ProductsFeatured.map((value) => {
    value.newPrice = (
      value.price *
      (1 - value.discountPercentage / 100)
    ).toFixed(0);
    return value;
  });
  let ProductsNew = await Product.find({
    status: "active",
    deleted: false,
  })
    .sort({ position: "desc" })
    .limit(10)
    .lean();
  ProductsNew = ProductsNew.map((value) => {
    value.newPrice = parseFloat(
      (value.price * (1 - value.discountPercentage / 100)).toFixed(0)
    );
    return value;
  });
  res.render("./clients/pages/home/index.pug", {
    title: "Trang chủ",
    ProductsFeatured: ProductsFeatured,
    ProductsNew: ProductsNew,
  });
};
