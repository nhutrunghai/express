
module.exports.dashboard = (req,res)=> {
    console.log(res.app.locals.pathAdmin);
    res.render('./admins/pages/dashboard/index.pug',{title:"DASHBOARD"})
}