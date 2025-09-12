const databaseAccounts = require("../../model/accounts.model");
const md5 = require("md5");
const { system } = require("../../config/system");
module.exports.index = async (req, res) => {
  const token = req?.cookies?.token;
  if (token) {
    res.redirect(`/${system.pathAdmin}/dashboard`);
  } else {
    res.render("./admins/pages/auth/login.pug", { title: "Đăng nhập" });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await databaseAccounts.findOne({
    email: email,
    password: md5(password),
  });
  console.log(req.body);
  console.log(user);
  if (!user) {
    req.flash("error", "Tài khoản hoặc mật khẩu không đúng !");
    res.redirect(req.get("Referer"));
  } else {
    if (user.status == "inactive") {
      req.flash("error", "Tài khoản đã bị khóa !");
      res.redirect(req.get("Referer"));
    }
    res.cookie("token", user.token);
    res.redirect(`/${system.pathAdmin}/dashboard`);
  }
};
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${system.pathAdmin}/auth/login`);
};
