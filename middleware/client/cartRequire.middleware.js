const databaseCarts = require("../../model/carts.model");
module.exports = async (req, res, next) => {
  async function createCart() {
    const cart = new databaseCarts();
    await cart.save();
    res.cookie("cartId", cart.id);
    return cart;
  }
  let cart;
  if (!req.cookies.cartId) {
    cart = await createCart();
  } else {
    cart = await databaseCarts.findOne({ _id: req.cookies.cartId }).lean();
    if (!cart) {
      cart = await createCart();
    }
  }
  cart.totalProduct =
    cart.products.length > 0
      ? cart.products.reduce((sum, item) => sum + item.stock, 0)
      : 0;
  res.locals.cart = cart;
  next();
};
