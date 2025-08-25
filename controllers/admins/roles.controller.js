// [GET] "/"
const databaseRoles = require("../../model/roles.model.js")
module.exports.index = async (req,res) => {
    const roles = await databaseRoles.find({})
    res.render("./admins/pages/roles/index.pug",{title:"Nhóm Quyền",roles:roles})
}
// [POST] "/"
module.exports.createRole = async (req,res) => {
    const body = req.body
    console.log({body});
    
    await databaseRoles.create(body)
    res.redirect(req.get('Referer'))
}