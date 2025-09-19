const _ = require("lodash");
const databaseProduct = require("../../model/product.model");
const databaseCategorys = require("../../model/products-category.model");
// [GET] "/product"
module.exports.products = async (req, res) => {
  const Breadcrumb = [
    { text: "Trang chủ", href: "/" },
    { text: "Sản phẩm", href: "/product" },
  ];
  const products = await databaseProduct
    .find({
      status: "active",
      deleted: false,
    })
    .sort({ position: -1 });
  const newProducts = products.map((value) => {
    value.newPrice = parseFloat(
      (value.price * (1 - value.discountPercentage / 100)).toFixed(0)
    );
    return value;
  });
  res.render("./clients/pages/product/index.pug", {
    title: "Product",
    titleCategory: "Danh sách sản phẩm",
    products: newProducts,
    Breadcrumb: Breadcrumb,
  });
};
// [GET] "/product/:slugCategory"
module.exports.category = async (req, res, next) => {
  const Breadcrumb = [
    { text: "Trang chủ", href: "/" },
    { text: "Sản phẩm", href: "/product" },
  ];
  const Categorys = await databaseCategorys
    .find({
      status: "active",
      deleted: false,
    })
    .lean();
  const CategoryParam = Categorys.find(
    (category) => category.slug === req.params.slugCategory
  );
  if (!CategoryParam)
    return res.status(404).render("./clients/pages/errors/404.pug");
  function addBreadCrumb(categoryId) {
    if (categoryId.parentId) {
      const parent = Categorys.find((category) =>
        _.isEqual(category._id, categoryId.parentId)
      );
      addBreadCrumb(parent);
    }
    Breadcrumb.push({ text: categoryId.title, href: `./${categoryId.slug}` });
  }
  addBreadCrumb(CategoryParam);

  function findCategory(categoryId) {
    const result = [categoryId];
    Categorys.forEach((category) => {
      if (_.isEqual(category.parentId, categoryId)) {
        result.push(...findCategory(category._id));
      }
    });
    return result;
  }
  const root = findCategory(CategoryParam._id);
  const products = await databaseProduct
    .find({
      status: "active",
      deleted: false,
      category: { $in: root },
    })
    .sort({ position: "desc" })
    .lean();
  let newProducts = products.map((value) => {
    value.newPrice = parseFloat(
      (value.price * (1 - value.discountPercentage / 100)).toFixed(0)
    );
    return value;
  });
  res.render("./clients/pages/product/index.pug", {
    title: "Product",
    titleCategory: CategoryParam.title ?? "Danh sách sản phẩm",
    products: newProducts,
    Breadcrumb: Breadcrumb,
  });
};
// [GET] "/product/detail/:slugProduct"
module.exports.productItem = async (req, res) => {
  const product = await databaseProduct
    .findOne({ slug: req.params.slugProduct, deleted: false, status: "active" })
    .lean();
  if (product.discountPercentage) {
    product.newPrice = parseFloat(
      (product.price * (1 - product.discountPercentage / 100)).toFixed(0)
    );
  }
  const Breadcrumb = [
    { text: "Trang chủ", href: "/" },
    { text: "Sản phẩm", href: "/product" },
    { text: product.title, href: `/product/detail/${product.slug}` },
  ];

  res.render("./clients/pages/product/detail.pug", {
    title: product.title,
    product: product,
    Breadcrumb: Breadcrumb,
  });
};
