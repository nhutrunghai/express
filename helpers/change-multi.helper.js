module.exports = async (req, res, text, database) => {
  const body = req.body;
  let { ids, type: status } = body;
  ids = body.ids.split(",");
  switch (status) {
    case "active":
    case "inactive":
      await database.updateMany(
        { _id: { $in: ids } },
        { $set: { status: status } }
      );
      req.flash("info", "Thay đổi trạng thái thành công");
      break;
    case "delete-select":
      await database.updateMany(
        { _id: { $in: ids } },
        { $set: { deleted: true, deleted_at: new Date() } }
      );
      req.flash("info", `Xóa ${text} thành công`);
      break;
    case "changel-postion":
      for (let value of ids) {
        const [id, postion] = value.split("-");
        await database.updateOne({ _id: id }, { position: postion });
      }
      req.flash("info", "Thay đổi vị trí thành công");
      break;
    default:
      break;
  }

  res.redirect(req.get("Referer"));
};
