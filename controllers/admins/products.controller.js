const databaseProducts = require("../../model/product.model");
module.exports.products = async (req, res) => {
  let keySearch = "";
  const query = { deleted: false };
  let {status:queryStatus,search:querySearch,page:queryPage} = req.query
  if (queryStatus) query.status = queryStatus;
  if (querySearch) {
    keySearch = querySearch;
    query.title = new RegExp(`^${keySearch}`, "i");
  }
  let products = await databaseProducts.find(query);
  const lengthPage = Math.ceil(products.length / 4);
  const arr = Array.from({ length: lengthPage }, (_, i) => i + 1);
  
  if (!queryPage || isNaN(queryPage)) {
    queryPage = 1;
  } 

  const startPage = (queryPage - 1)* 4
  const endPage = queryPage * 4
  products = products.slice(startPage,endPage)
  res.render("./admins/pages/products/index.pug", {
    title: "Quản lý sản phẩm",
    products: products,
    keySearch: keySearch,
    arrPage: arr,
  });
};
