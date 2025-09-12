const { Router } = require("express");
const accountController = require("../../controllers/admins/accounts.controller");
const router = Router();
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
const upload = multer({ storage: storage });
router.get("/", accountController.index);
router.get("/create", accountController.create);
router.post("/create", upload.single("avatar"), accountController.createUser);
router.get("/edit/:id", accountController.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  accountController.editUpdate
);
module.exports = router;
