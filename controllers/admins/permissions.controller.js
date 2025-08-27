const databaseRoles = require('../../model/roles.model')
// [GET] "/"
module.exports.index = async (req,res) => {
    const roles = await databaseRoles.find({})    
    res.render("./admins/pages/permissions/index.pug", {title:"Cấu hình",roles:roles})
}
// [PATCH] "/"
module.exports.update =  async (req,res) => {
    if(req.body){
        const permissions = JSON.parse(req.body.permissions)
        
        for(let item of permissions){
            await databaseRoles.updateOne({_id:item.id},{$set:{permission:item.permissions}})
        }
    }
    res.redirect(req.get("Referer"))
}