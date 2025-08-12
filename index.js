const express = require("express");
const router = require("./routes/clients/index.router");
const routerAdmim = require("./routes/admins/index.router")
const database = require("./config/database")
const {system} = require('./config/system')
require("dotenv").config();
const post = process.env.POST;
const app = express();
app.set("views", "./views");
app.set("views engine", "pug");
app.use(express.static("public"));    

// Router
router(app);
routerAdmim(app)
// end

// Database
database.connect()
//end

// Variable Global
app.locals.pathAdmin = system.pathAdmin
app.listen(post, () => {
  console.log("Done POST : ", post);
});
