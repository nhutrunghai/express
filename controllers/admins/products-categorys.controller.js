const databaseCategerys = require("../../model/products-category.model");
const changeMultiHelper = require("../../helpers/change-multi.helper");
const changeSingleHelper = require("../../helpers/change-single.helper");
var _ = require("lodash");
// [GET] "/"
module.exports.index = async (req, res) => {
  const query = {
    deleted: false,
  };
  // let { status: queryStatus, search: querySearch } = req.query;
  // // Query Status
  // if (queryStatus) query.status = queryStatus;
  // // Query Search
  // if (querySearch) {
  //   keySearch = querySearch;
  //   query.title = new RegExp(`^${keySearch}`, "i");
  // }
  const categorys = await databaseCategerys.find(query).lean();
  function handleTree(arr, parentID = null) {
    const result = [];
    for (let item of arr) {
      if (_.isEqual(item.parentId, parentID)) {
        item.children = handleTree(arr, item._id);
        result.push(item);
      }
    }
    return result;
  }
  const TreeCategotys = handleTree(categorys);
  res.send(TreeCategotys);
  // res.render("./admins/pages/categorys/index.pug", {
  //   title: "Danh mục sản phẩm",
  //   categories: categorys,
  // });
};
// [PACTH] "/change-multi"
module.exports.changeMulti = (req, res) => {
  changeMultiHelper(req, res, "danh mục", databaseCategerys);
};
// [PACTH] "/change-single"
module.exports.changeSingle = (req, res) => {
  changeSingleHelper(req, res, databaseCategerys);
};
