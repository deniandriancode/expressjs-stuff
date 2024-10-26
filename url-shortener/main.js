// this is so dum bro but it works for small scale
const express = require("express");
const path = require("path");
const fs = require("fs");
const fsP = require("fs/promises");

function randInt(left, right) {
  return Math.floor(Math.random() * (right - left + 1)) + left;
}

function genShort(rawUrl) {
  const bars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const l = bars.length;
  let idx;
  const res = Array.from([]);

  for (let i = 0; i < 6; ++i) {
    idx = randInt(0, l-1);
    res.push(bars[idx]);
  }

  return res.join('');
}

function writeShortUrl(strin, dest) {
  const fileName = path.join(__dirname, "short_storage", "data.json");
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, "{}");
  }

  let dataJSON;
  fsP.readFile(fileName, "utf8")
    .then((res) => {
      dataJSON = JSON.parse(res);
      dataJSON[strin] = dest;
    })
    .then(() => {
      fsP.writeFile(fileName, JSON.stringify(dataJSON, null, 2));
    });
}

function getDestUrl(strin) {
  const fileName = path.join(__dirname, "short_storage", "data.json"); // nah i won't handle non existent key
  if (!fs.existsSync(fileName)) {
    return "https://archlinux.org"; // just redirect to Arch Linux homepage, what do i care
  }

  return fsP.readFile(fileName, "utf8");
}

const storagePath = path.join(__dirname, "short_storage");
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath);
  console.log("Created %s", storagePath);
}

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("urlsh_index");
});

app.get("/:shrt", async function (req, res) {
  const dest = JSON.parse(await getDestUrl(req.params.shrt));
  res.redirect(303, dest[req.params.shrt]);
})

// need to modify this function to actually short the url
app.post("/short", function (req, res) {
  const supp = req.body["originalText"]; // need to check for valid url
  const shortResult = genShort(supp);
  writeShortUrl(shortResult, supp); // nah i won't check if the key exists
  const result = "http://localhost:3000/" + shortResult;
  res.render("urlsh_result", { result: result });
});

app.listen(3000);
console.log("Listening at http://localhost:3000");

