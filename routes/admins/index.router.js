const dashboard = require("./dashboard.router");
const products = require("./products.router");
const ProductsCategotys = require("./products-categorys.router");
const settings = require("./settings.router");
const roles = require("./roles.router");
const permission = require("./permissions.router");
const accounts = require("./accounts.router");
const auth = require("./auth.router");
const profile = require("./profile.router");
const {
  requirePermissions,
} = require("../../middleware/admin/permissions.middleware");
const { requireAuth } = require("../../middleware/admin/auth.middleware");
const { system } = require("../../config/system");
module.exports = (app) => {
  app.use(`/${system.pathAdmin}/dashboard`, requireAuth, dashboard);
  app.use(
    `/${system.pathAdmin}/products`,
    requireAuth,
    requirePermissions("products-view"),
    products
  );
  app.use(
    `/${system.pathAdmin}/categories`,
    requireAuth,
    requirePermissions("products-category-view"),
    ProductsCategotys
  );
  app.use(`/${system.pathAdmin}/settings`, requireAuth, settings);
  app.use(
    `/${system.pathAdmin}/roles`,
    requireAuth,
    requirePermissions("roles-view"),
    roles
  );
  app.use(`/${system.pathAdmin}/permissions`, requireAuth, permission);
  app.use(`/${system.pathAdmin}/users`, requireAuth, accounts);
  app.use(`/${system.pathAdmin}/auth`, auth);
  app.use(`/${system.pathAdmin}/profile`, requireAuth, profile);
};
