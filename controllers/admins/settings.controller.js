// [GET] "/"
module.exports.index = (req,res) => {
    res.render("./admins/pages/settings/index.pug", {title:"Cấu hình"})
}