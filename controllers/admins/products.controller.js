const databaseProducts = require('../../model/product.model')
module.exports.products = async (req,res) => {
    let keySearch = "";
    const query = {deleted:false}
    if(req.query.status) query.status = req.query.status
    if(req.query.search) {
        keySearch = req.query.search
        query.title = new RegExp(`^${keySearch}`,'i')
    }
    const products = await databaseProducts.find(query)
    const lengthPage = Math.ceil(products.length / 4) 
    const arr = Array.from({ length: lengthPage },(_,i) => i + 1);
    console.log({arr});
    
    res.render('./admins/pages/products/index.pug', {title : 'Quản lý sản phẩm',products:products,keySearch:keySearch})
}