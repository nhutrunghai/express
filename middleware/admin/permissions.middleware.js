module.exports.requirePermissions = (option = null) => {
  return function (req, res, next) {
    const { role_id } = res.locals.user;
    if (!role_id) {
      return res.send("Not Found");
    }
    if (option) {
      const { permission } = role_id;
      if (!permission.includes(option)) {
        return res.send("Not Found");
      }
    }
    next();
  };
};
