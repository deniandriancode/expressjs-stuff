const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session"); // for track current working directory
const os = require("os");
const { getListDir, createDirectory, touchFile, removeObject } = require("./utils");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser("flipboard cat"));
app.use(session({
  secret: 'flipboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));


let cwd = "~";

app.use("/public", express.static(path.join(__dirname, "assets")));

app.get("/", function (req, res) {
  const data = getListDir();
  cwd = data.path;
  res.render("index", { data: data, cwd: cwd, title: "Home" });
});

app.post("/", function (req, res) {
  cwd = path.join(cwd, req.body.cwd);
  if (req.body.cwd === os.userInfo().username)
    cwd = os.homedir()
  const data = getListDir(cwd);
  const title = path.basename(cwd) === os.userInfo().username ? "Home" : path.basename(cwd);
  res.render("index", { data: data, cwd: cwd, title: title });
});

app.post("/new-dir", function (req, res) {
  createDirectory(path.join(cwd, req.body.name));
  const data = getListDir(cwd);
  const title = path.basename(cwd) === os.userInfo().username ? "Home" : path.basename(cwd);
  res.render("index", { data: data, cwd: cwd, title: title });
});

app.post("/new-file", function (req, res) {
  touchFile(path.join(cwd, req.body.name));
  const data = getListDir(cwd);
  const title = path.basename(cwd) === os.userInfo().username ? "Home" : path.basename(cwd);
  res.render("index", { data: data, cwd: cwd, title: title });
});


app.post("/delete", function (req, res) {
  removeObject(path.join(cwd, req.body.name));
  const data = getListDir(cwd);
  const title = path.basename(cwd) === os.userInfo().username ? "Home" : path.basename(cwd);
  res.render("index", { data: data, cwd: cwd, title: title });
});

app.listen(3000);
console.log("Listening at http://localhost:3000");
