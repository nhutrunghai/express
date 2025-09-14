// [GET] "/search"
const databaseProducts = require("../../model/product.model")
module.exports.index = async (req,res) => {
    const  {q} = req.query
    const keySearch = new RegExp(q,'i')
    const Products = await databaseProducts.find({title:keySearch, deleted:false,status:'active'}) 
    const Breadcrumb = [{ text: "Trang chủ", href: "/" },{ text: `Kết quả tìm kiếm '${q}`, href: `/search?q=${q}` }]   
    res.render("./clients/pages/product/index.pug", {
        title: "Search",
        titleCategory: `Kết quả tìm kiếm '${q}'`,
        products: Products,
        Breadcrumb:Breadcrumb,
        keySearch:q
    });
}