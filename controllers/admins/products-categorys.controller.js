const databaseCategerys = require("../../model/products-category.model");
const changeMultiHelper = require("../../helpers/change-multi.helper");
const changeSingleHelper = require("../../helpers/change-single.helper");
var _ = require("lodash");
// [GET] "/"
module.exports.index = async (req, res) => {
  const query = {
    deleted: false,
  };
  let { status: queryStatus, search: querySearch } = req.query;
  // Query Status
  if (queryStatus) query.status = queryStatus;
  // Query Search
  if (querySearch) {
    keySearch = querySearch;
    query.title = new RegExp(`^${keySearch}`, "i");
  }
  const tree = await databaseCategerys.find({}).lean();
  const categorys = await databaseCategerys.find(query);

  function handleTree(arr, parentID = null) {
    const result = [];
    for (let item of arr) {
      if (_.isEqual(item.parentId, parentID)) {
        const children = handleTree(arr, item._id);
        if (children.length > 0) {
          item.children = children;
        }
        result.push(item);
      }
    }
    return result;
  }
  const TreeCategotys = handleTree(tree);

  res.render("./admins/pages/categorys/index.pug", {
    title: "Danh mục sản phẩm",
    categories: categorys,
    TreeCategotys: TreeCategotys,
  });
};
// [PACTH] "/change-multi"
module.exports.changeMulti = (req, res) => {
  changeMultiHelper(req, res, "danh mục", databaseCategerys);
};
// [PACTH] "/change-single"
module.exports.changeSingle = (req, res) => {
  changeSingleHelper(req, res, databaseCategerys);
};
