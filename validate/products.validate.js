module.exports.createItem = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Không được bỏ trống title");
    res.redirect("/admin/products/create");
    return;
  }
  next();
};
