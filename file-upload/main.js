const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "HUH");
  }
});
const upload = multer({ storage: storage });

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res, next) {
  res.render("index", { message: "File Uplad Index" });
});

app.post("/upload", upload.single("dataPart"), function (req, res, next) {
  console.log(req.file);
  res.redirect("/");
});

app.listen(3000);

console.log("listening at port 3000...");

