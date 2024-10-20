const express = require("express");
const path = require("path");

const FILES_DIR = path.join(__dirname, "files");
const app = express();

app.get("/", function (req, res) {
  res.send("<a href='/files/dummy_file.bin'>Download</a>")
});

app.get("/files/:file", function (req, res, next) {
  res.download(req.params.file, { root: FILES_DIR });
});

app.listen(3000);
console.log("listening...");
