const databaseRoles = require('../../model/roles.model')
const databaseAccounts = require("../../model/accounts.model");
// [GET] "/"
module.exports.index = async (req, res) => {
  const accounts = await databaseAccounts.find({},{_id:1,fullName:1,email:1,role_id:1,status:1}).lean()
  const roles = await databaseRoles.find({},{_id:1,title:1})
  accounts.forEach((account) => {
    if(!account.role_id){
      account.role = 'Người dùng'
    }else{
      account.role = roles.find(role => {
        return role._id == account.role_id
      }).title
    }
  })
  console.log(accounts);
  
  res.render("./admins/pages/accounts/index.pug" , {title:'Users',accounts:accounts});
};

// [GET] "/create"
module.exports.create = async (req, res) => {
  const roles = await databaseRoles.find({})
  res.render("./admins/pages/accounts/create.pug",{title:'Create User',roles:roles});
};

// [POST] "/create"
module.exports.createUser = async (req, res) => {
  const user = await databaseAccounts.findOne({
    email:req.body.email,
    deleted:false
  }) 
  if(user){
    req.flash("error","Email đã tồn tại")
    res.redirect(req.get("Referer"))
  }else{
    if(req.file){
      req.body.avatar = `/upload/${req.file.filename}`
    }
    await databaseAccounts.create(req.body)
    req.flash("info","Tạo user thành công")
    res.redirect(req.get("Referer"))
  }
};

// [GET] "/edit"
module.exports.edit = async (req, res) => {

};