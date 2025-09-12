const databaseAccounts = require("../../model/accounts.model");
const { system } = require("../../config/system");
module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies?.token;
  const user = await databaseAccounts
    .findOne({ token: token })
    .populate("role_id");
  if (!user) {
    return res.redirect(`/${system.pathAdmin}/auth/login`);
  }
  res.locals.user = user;
  next();
};
