const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const searchRouter = require("./search.router")
const treeCategotys = require("../../helpers/treeCategory.helper");
const databaseCategerys = require("../../model/products-category.model");
const cartRequire = require("../../middleware/client/cartRequire.middleware")
const cartRouter = require("./cart.router");
module.exports = async (app) => {
  const tree = await databaseCategerys.find({ deleted: false }).lean();
  const category = treeCategotys(tree);
  app.locals.category = category;
  app.use(cartRequire)
  app.use("/", homeRouter);
  app.use("/product", productRouter);
  app.use("/search",searchRouter)
  app.use("/cart",cartRouter)
  app.use((req, res) => {
    res.status(404).render("./clients/pages/errors/404.pug");  
  }) // bắt 404 (404 là lỗi người dùng thường xuyên gặp: gõ nhầm URL, click link cũ, sản phẩm đã xóa. ) khi người dùng truy cập vào các router chưa đc chỉ định 
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("./clients/pages/errors/404.pug");
  }); /* bắt 500 Đây là lỗi hệ thống (bug code, DB sập, exception).[ thằng này sẽ bắt qua try catch nếu router nhảy vào catch]
      Người dùng bình thường ít khi gặp, và cũng không nên show chi tiết lỗi (tránh lộ info nhạy cảm như query, stacktrace).*/
};
