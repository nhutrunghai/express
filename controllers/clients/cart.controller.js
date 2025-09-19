const databaseCart = require("../../model/carts.model");
const _ = require("lodash");
// [GET] "/cart"
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  let cartProducts = [];
  if (cartId) {
    const cart = await databaseCart
      .findOne({ _id: cartId })
      .populate({ path: "products.product_id" })
      .lean();
    cartProducts = cart?.products || [];
  }
  // console.log(cartProducts);
  if (cartProducts.length > 0) {
    cartProducts.forEach((item) => {
      const { product_id } = item;
      product_id.newPrice = parseFloat(
        (product_id.price * (1 - product_id.discountPercentage / 100)).toFixed(
          0
        )
      );
    });
  }

  res.render("./clients/pages/cart/index.pug", {
    title: "Giỏ hàng",
    cartProducts: cartProducts,
  });
};
// [POST] "/cart/add"
module.exports.addCart = async (req, res) => {
  const cartId = req.cookies.cartId;
  const { product_id, stock } = req.body;
  const cart = await databaseCart.findOne({ _id: cartId });
  if (!cart) res.status("404").render("./clients/pages/errors/404.pug");
  const product = cart.products.find(
    (item) => item.product_id.toString() === product_id
  );

  if (product) {
    await databaseCart.updateOne(
      {
        _id: cartId,
        "products.product_id": product.product_id,
      },
      { "products.$.stock": product.stock + parseInt(stock) } // $ đại diện cho phần tử đc tìm thấy
      // ví dụ "products.product_id": product.product_id, tìm thấy ở vị trí số 2 thì phần tử đó sẽ
      // đc gắn vào $ và products.$ truy cập vào phần tử thứ 2 rồi .stock update
    );
  } else {
    const objProdcut = {
      product_id,
      stock: parseInt(stock),
    };
    await databaseCart.updateOne(
      { _id: cartId },
      { $push: { products: objProdcut } }
    );
  }
  req.flash("info", "Thêm vào giỏ hàng thành công");
  res.redirect(req.get("Referer"));
};

// [DELETE] "/cart/delete/id"
module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const cartId = req.cookies.cartId;
  if (id) {
    await databaseCart.updateOne(
      { _id: cartId},
      { $pull:{
        products:{
            product_id:id
        }
      } } 
    );
  }
  req.flash("info", "Xóa sản phẩm khỏi đơn hàng");
  res.redirect(req.get("Referer"))
};
