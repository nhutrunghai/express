// [GET] "/"
module.exports.index = (req, res) => {
  res.render("./admins/pages/accounts/index.pug");
};

// [GET] "/create"
module.exports.create = (req, res) => {
  res.render("./admins/pages/accounts/create.pug");
};
