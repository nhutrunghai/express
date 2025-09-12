var _ = require("lodash");
module.exports = (arr) => {
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
  return handleTree(arr);
};
