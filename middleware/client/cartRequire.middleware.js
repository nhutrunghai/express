const databaseCarts = require("../../model/carts.model")
module.exports = async (req,res,next) => {
    async function createCart(){
        const cart = new databaseCarts()
        await cart.save()
        res.cookie('cartId',cart.id)
    }
    if(!req.cookies.cartId){
        await createCart()
    }else{
        const cart = await databaseCarts.findOne({_id:req.cookies.cartId})
        // if(!cart) await createCart()
        res.locals.cart = cart        
    }
    next()
}