module.exports.home = (req, res) => {
  res.render("./clients/pages/home/index.pug", { title: "Trang chủ" });
};
