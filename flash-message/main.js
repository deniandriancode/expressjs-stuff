const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const sessionStore = new session.MemoryStore;

const app = express();
// app.set("trust proxy", 1);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cookieParser("flipboard cat"));
app.use(session({
  secret: 'flipboard cat',
  resave: false,
  saveUninitialized: true,
  // store: sessionStore
}));

const flashDo = function (req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
}

app.use(flashDo);
app.get("/flash", function (req, res) {
  res.render("flash_home");
});

app.all("/flash/setup", function (req, res) {
  req.session.flash = true;
  res.redirect(303, "/flash/message");
});

app.get("/flash/message", function (req, res) {
  console.log(res.locals);
  res.render("flash_message", { flash: res.locals.flash });
});

app.listen(3000);
console.log("listening at http://localhost:3000");

