const dashboard = require("./dashboard.router");
const products = require("./products.router");
const ProductsCategotys = require("./products-categorys.router");
const settings = require("./settings.router");
const roles = require("./roles.router");
const permission = require("./permissions.router");
const accounts = require("./accounts.router");
const { system } = require("../../config/system");
module.exports = (app) => {
  app.use(`/${system.pathAdmin}/dashboard`, dashboard);
  app.use(`/${system.pathAdmin}/products`, products);
  app.use(`/${system.pathAdmin}/categories`, ProductsCategotys);
  app.use(`/${system.pathAdmin}/settings`, settings);
  app.use(`/${system.pathAdmin}/roles`, roles);
  app.use(`/${system.pathAdmin}/permissions`, permission);
  app.use(`/${system.pathAdmin}/users`, accounts);
};
