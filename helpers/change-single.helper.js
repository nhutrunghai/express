module.exports = async (req, res, database) => {
  const { id, status } = req.params;
  await database.updateOne({ _id: id }, { status: status });
  req.flash("info", "Cập nhật trạng thái thành công");
  res.redirect(req.get("Referer"));
};
