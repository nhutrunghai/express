const express = require("express");
const path = require("path");
const router = require("./routes/clients/index.router");
const routerAdmim = require("./routes/admins/index.router");
const database = require("./config/database");
const { system } = require("./config/system");
const methodOverride = require("method-override"); // thư viện tạo các phương thức khác cho thẻ form
const flash = require("express-flash"); // thư viện bắt thông báo
const cookieParser = require("cookie-parser"); // thư viện cookie
const session = require("express-session");
const slug = require("mongoose-slug-updater"); // đây là thư viện tự tạo slug trong moongso
// ex : Iphone 9 -> iphone-9 để hiển thị bên client tốt cho seo
const multer = require("multer"); // thư viện này dùng để xử lý 1 form có trường input là file ảnh/ file tài  liệu
// nếu ko có thư viện này hỗ trợ thì bên client gửi về bên server body chỉ nhận đc là 1 string name của ảnh/file

require("dotenv").config(); // thư viện dotenv lưu trữ các hàng số private
const post = process.env.POST;
const app = express();
app.set("views", "./views"); // set views dùng folder view
app.set("views engine", "pug"); // set views dùng ngôn ngữ pug
app.use(
  express.urlencoded({ extended: true }) // Hoặc install và dùng thư viện bodyParser
); /*express.urlencoded tự động parse data client gửi 
   type=active&ids=123,456,789 -> { type: 'active', ids: '123,456,789' } vậy nên khi ko có thằng này
   sẽ ko thẻ req.body đc 
   tham số extended mặc định false chỉ parse đc obj đơn ko luồng nhau , true thì parse các obj
   lồng nhau
*/
app.use(express.static("public")); // set public cho 1 folder nào đó để có thể truy cập đc , nếu
// ko set public như này thì các file views sẽ ko thể truy cập đc , đây là folder người dùng có thể
// truy cập còn các folder khác là của bên back-end và private
app.use(methodOverride("_method")); // sử dụng thư viện method
app.use(cookieParser("FHSABV3JEWFBJSF")); // 1
app.use(session({ cookie: { maxAge: 60000 } })); // 2
app.use(flash()); // 3 thằng này dùng để set bắn thông báo
// Router
router(app);
routerAdmim(app);
// end
console.log("path : ", path.join(__dirname, "node_moudles", "tinymce"));
// `/${__dirname}/node_moudles/tinymce`
// Database
database.connect();
//end

// TinyMcE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// Variable Global
app.locals.pathAdmin = system.pathAdmin; // set biến để dạng public thì các file như pug hcos thể truy cập đc
// mà ko cần truyền qua constructor
app.listen(post, () => {
  console.log("Done POST : ", post);
});
