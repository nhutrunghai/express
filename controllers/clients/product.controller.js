const _ = require("lodash");
const databaseProduct = require("../../model/product.model");
const databaseCategorys = require("../../model/products-category.model");
module.exports.product = async (req, res) => {
  const products = await databaseProduct
    .find({
      status: "active",
      deleted: false,
    })
    .sort({ position: -1 });
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
module.exports.category = async (req, res) => {
  const Categorys = await databaseCategorys
    .find({
      status: "active",
      deleted: false,
    })
    .lean();
  const CategoryParam = Categorys.find(
    (category) => category.slug === req.params.slugCategory
  );

  function findCategory(categoryId) {
    const result = [];
    Categorys.flatMap((category) => {
      if (_.isEqual(category.parentId, categoryId)) {
        result.push([category._id, ...findCategory(category._id)]);
      }
    });
    return result;
  }
  const result = findCategory(CategoryParam._id);
  console.log({ result });

  const products = await databaseProduct
    .find({
      status: "active",
      deleted: false,
      category: { $in: result },
    })
    .sort({ position: "desc" })
    .lean();
  let newProducts = products.map((value) => {
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
