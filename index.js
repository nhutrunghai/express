const express = require("express");
const router = require("./routes/clients/index.router");
require("dotenv").config();
const post = process.env.POST;
const app = express();
app.set("views", "./views");
app.set("views engine", "pug");
app.use(express.static("public"));
// Router
router(app);
//
app.listen(post, () => {
  console.log("Done POST : ", post);
});
