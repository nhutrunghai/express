const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const treeCategotys = require("../../helpers/treeCategory.helper");
const databaseCategerys = require("../../model/products-category.model");
module.exports = async (app) => {
  const tree = await databaseCategerys.find({ deleted: false }).lean();
  const category = treeCategotys(tree);
  app.locals.category = category;
  app.use("/", homeRouter);
  app.use("/product", productRouter);
};
