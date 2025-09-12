const databaseRoles = require("../../model/roles.model");
const databaseAccounts = require("../../model/accounts.model");
const { system } = require("../../config/system");
const md5 = require("md5");
// [GET] "/"
module.exports.index = async (req, res) => {
  const accounts = await databaseAccounts
    .find({}, { _id: 1, fullName: 1, email: 1, role_id: 1, status: 1 })
    .populate("role_id");
  res.render("./admins/pages/accounts/index.pug", {
    title: "Users",
    accounts: accounts,
  });
};

// [GET] "/create"
module.exports.create = async (req, res) => {
  const roles = await databaseRoles.find({});
  res.render("./admins/pages/accounts/create.pug", {
    title: "Create User",
    roles: roles,
  });
};

// [POST] "/create"
module.exports.createUser = async (req, res) => {
  const user = await databaseAccounts.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (user) {
    req.flash("error", "Email đã tồn tại");
    res.redirect(req.get("Referer"));
  } else {
    if (req.file) {
      req.body.avatar = `/uploads/${req.file.filename}`;
    }
    req.body.role_id = req.body.role_id || null;
    req.body.password = md5(req.body.password);
    await databaseAccounts.create(req.body);
    req.flash("info", "Tạo user thành công");
    res.redirect(req.get("Referer"));
  }
};

// [GET] "/edit"
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const account = await databaseAccounts.findOne({ _id: id });
  const roles = await databaseRoles.find({});
  res.render("./admins/pages/accounts/edit.pug", {
    title: "Edit User",
    account: account,
    roles: roles,
  });
};
// [PATCH] "/edit"
module.exports.editUpdate = async (req, res) => {
  const { id } = req.params;
  const user = await databaseAccounts.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (user) {
    req.flash("error", "Email đã tồn tại");
    res.redirect(req.get("Referer"));
  } else {
    if (req.file) {
      req.body.avatar = `/uploads/${req.file.filename}`;
    } else {
      if (!req.body.current) {
        await databaseAccounts.updateOne(
          { _id: id },
          { $unset: { avatar: "" } }
        );
      }
    }
    if (!req.body.password) delete req.body.password;
    req.body.role_id = req.body.role_id || null;
    await databaseAccounts.updateOne({ _id: id }, req.body);
    req.flash("info", `Cập nhật user [${id}] thành công`);
    res.redirect(`/${system.pathAdmin}/users`);
  }
};
