const { system } = require("../../config/system");
const databaseProducts = require("../../model/product.model");
const changeMultiHelper = require("../../helpers/change-multi.helper");
const changeSingleHelper = require("../../helpers/change-single.helper");
module.exports.products = async (req, res) => {
  let keySearch = "";
  const query = { deleted: false };
  let { status: queryStatus, search: querySearch, page: queryPage } = req.query;
  // Query Status
  if (queryStatus) query.status = queryStatus;
  // Query Search
  if (querySearch) {
    keySearch = querySearch;
    query.title = new RegExp(`^${keySearch}`, "i");
  }
  // Crate Obj Products
  const ObjProdcuts = {
    setQuantityItem: 6 /*Số lượng item hiển thị trong mỗi page*/,
    currentPage: queryPage ? parseInt(queryPage) : 1 /*Hiển thị page hiện tại*/,
  };
  ObjProdcuts.skipPage =
    (ObjProdcuts.currentPage - 1) * ObjProdcuts.setQuantityItem;
  ObjProdcuts.setQuantityItem; /*Vị trí bắt đầu skip của các phần trong database*/
  ObjProdcuts.quantityItem = await databaseProducts.countDocuments(
    query
  ); /*Số lượng phần tử sau khi truy vấn*/
  let querySort = {};
  if (!req.query.sortBy) {
    querySort.position = "desc";
  } else {
    switch (req.query.sortBy) {
      case "position":
        querySort.position = "desc";
        break;
      case "quanity":
        querySort.stock = "desc";
        break;
      case "new":
        querySort.createdAt = "desc";
        break;
      case "price":
        querySort.price = req.query.order;
    }
  }

  products = await databaseProducts
    .find(query)
    .sort(querySort)
    .limit(ObjProdcuts.setQuantityItem)
    .skip(ObjProdcuts.skipPage);
  ObjProdcuts.totalPage = Math.ceil(
    ObjProdcuts.quantityItem / ObjProdcuts.setQuantityItem
  ); /* Số Lượng page sau khi tính toán*/
  for (let i = 0; i < products.length; i++) {
    products[i].stt = i + 1 + ObjProdcuts.skipPage;
  }

  res.render("./admins/pages/products/index.pug", {
    title: "Quản lý sản phẩm",
    products: products,
    keySearch: keySearch,
    ObjProdcuts: ObjProdcuts,
  });
};
// [PACTH] "/change-status"
module.exports.changeSingle = (req, res) => {
  changeSingleHelper(req, res, databaseProducts);
};
// [PACTH] "/change-multi"
module.exports.changeMulti = (req, res) => {
  changeMultiHelper(req, res, "sản phẩm", databaseProducts);
};

// [DELETE] "/delete/:id"
module.exports.deleteItem = async (req, res) => {
  req.flash("info", "Xóa sản phẩm thành công");
  const { id } = req.params;
  await databaseProducts.updateOne(
    { _id: id },
    { deleted: true, deleted_at: new Date() }
  );
  res.redirect(req.get("Referer"));
};

// [GET] "/create"
module.exports.create = (req, res) => {
  res.render("./admins/pages/products/create.pug", {
    title: "Tạo sản phẩm",
  });
};

//[POST] "/create"
module.exports.createItem = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.deleted = false;
  if (!req.body.position) {
    const position = await databaseProducts.countDocuments({});
    req.body.position = position + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`; // ở đây vì do file ở chế độ public
    // nên khi client lấy đúg đường dẫn này ko cần đi qua public
  }

  req.flash("info", "Tạo sản phẩm thành công");
  databaseProducts.create(req.body);
  res.redirect(req.get("Referer"));
};

// [GET] "/edit"
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const product = await databaseProducts.findOne({ _id: id });
  const back = req.get("Referer");

  res.render("admins/pages/products/edit.pug", {
    title: "Cập Nhật Sản Phẩm",
    product: product,
    back: back,
  });
};
//  [PACTH] "/edit"
module.exports.editUpadte = async (req, res) => {
  const { id } = req.params;
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  console.log(req.file);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  } else {
    await databaseProducts.updateOne(
      { _id: id },
      { $unset: { thumbnail: "" } }
    );
  }
  if (req.body.createdAt) {
    req.body.createdAt = new Date(req.body.createdAt);
  } else {
    delete req.body.createdAt;
  }

  await databaseProducts.updateOne({ _id: id }, req.body, {
    timestamps: false /*
    Tắt timestamp cho lần update này vì thuộc tính này set ở schema sẽ làm cho các thuộc tính
    createAt và updateAt immutable (không cho sửa)
    */,
  });
  req.flash("info", `Cập nhật sản phẩm[${id}] thành công`);
  res.redirect(`/${system.pathAdmin}/products`);
};

// [GET] "detail"
module.exports.detail = async (req, res) => {
  const { id } = req.params;
  const product = await databaseProducts.findOne({ _id: id });
  res.render("admins/pages/products/detail.pug", {
    title: product.title,
    product: product,
  });
};
