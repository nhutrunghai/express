const dashboard = require("./dashboard.router");
const products = require("./products.router");
const ProductsCategotys = require("./products-categorys.router");
const { system } = require("../../config/system");
module.exports = (app) => {
  app.use(`/${system.pathAdmin}/dashboard`, dashboard);
  app.use(`/${system.pathAdmin}/products`, products);
  app.use(`/${system.pathAdmin}/categories`, ProductsCategotys);
};
