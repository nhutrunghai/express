const validateProduct = require("../../validate/products.validate");
const {
  requirePermissions,
} = require("../../middleware/admin/permissions.middleware");
const multer = require("multer"); /*
  chú ý khi dùng thư viện multer nếu gắn cho thẻ form enctype="multipart/form-data"
  thì ở router nên set upload... để có thể lấy đc body 
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Chỉ định thư mục lưu trữ tệp
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    // Tạo tên tệp duy nhất với thời gian hiện tại
    cb(null, Date.now() + "-" + file.originalname);
  }, // customs lại tên file khi lưu vì , khi lưu nó sẽ lưu tên mã hóa của ảnh và ko có đuôi file nên
  // khi lên web click hiển thị ảnh ko có đuôi sẽ ko hiển thị đc
  // khi custom thì trường file name ko còn mã hóa như này nữa 2f4b8239dc7ca9d3a469df3b0c3d7ab6
  // mà sẽ do ta quyết định
});
const upload = multer({ storage: storage }); /*
ở đây phải đúng đường dẫn nhé ,vì cấu hình public cho file này rồi nhưng nó chỉ dùng cho file pug
*/
const { Router } = require("express");
const products = require("../../controllers/admins/products.controller");
const router = Router();
router.get("/", products.products);
router.patch(
  "/change-status/:status/:id",
  requirePermissions("products-edit"),
  products.changeSingle
);
router.patch(
  "/change-multi",
  requirePermissions("products-edit"),
  products.changeMulti
);
router.delete(
  "/delete/:id",
  requirePermissions("products-delete"),
  products.deleteItem
);
router.get("/create", requirePermissions("products-create"), products.create);
router.post(
  "/create",
  requirePermissions("products-create"),
  upload.single("thumbnail"),
  validateProduct.createItem,
  products.createItem
);
router.get("/edit/:id", requirePermissions("products-edit"), products.edit);
router.patch(
  "/edit/:id",
  requirePermissions("products-edit"),
  upload.single("thumbnail"),
  products.editUpadte
);
router.get("/detail/:id", products.detail);
module.exports = router;
