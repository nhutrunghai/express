const dashboard = require('./dashboard.router')
const products = require('./products.router')
const {system} = require('../../config/system')
module.exports = (app)=>{  
    app.use(`/${system.pathAdmin}/dashboard`,dashboard)
    app.use(`/${system.pathAdmin}/products`,products)
}   