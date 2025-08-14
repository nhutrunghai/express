const databaseProducts = require("../../model/product.model");
module.exports.products = async (req, res) => {
  let keySearch = ""; 
  const query = { deleted: false };
  let {status:queryStatus,search:querySearch,page:queryPage} = req.query
  // Query Status
  if (queryStatus) query.status = queryStatus;
  // Query Search
  if (querySearch) {
    keySearch = querySearch;
    query.title = new RegExp(`^${keySearch}`, "i");
  }
  // Crate Obj Products
  const ObjProdcuts = {
    setQuantityItem:3, /*Số lượng item hiển thị trong mỗi page*/
    currentPage:queryPage ? parseInt(queryPage) : 1 /*Hiển thị page hiện tại*/
  }
  ObjProdcuts.skipPage = (ObjProdcuts.currentPage - 1) * ObjProdcuts.setQuantityItem /*Vị trí bắt đầu skip của các phần trong database*/
  ObjProdcuts.quantityItem = await databaseProducts.countDocuments(query) /*Số lượng phần tử sau khi truy vấn*/
  products = await databaseProducts.find(query).limit(ObjProdcuts.setQuantityItem).skip(ObjProdcuts.skipPage)
  ObjProdcuts.totalPage = Math.ceil(ObjProdcuts.quantityItem/ ObjProdcuts.setQuantityItem) /* Số Lượng page sau khi tính toán*/
  
  for(let i = 0;i < products.length;i++){
    products[i].stt = i + 1 + ObjProdcuts.skipPage
  }
  
  
  
  res.render("./admins/pages/products/index.pug", {
    title: "Quản lý sản phẩm",
    products: products,
    keySearch: keySearch,
    ObjProdcuts:ObjProdcuts
  });
};
module.exports.change = (req,res) => {
  
}