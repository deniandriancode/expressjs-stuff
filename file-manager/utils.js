const path = require("path");
const fs = require("fs");
const os = require("os");

function getListDir(dirname = os.homedir()) {
  const currentPath = path.resolve(dirname);
  const directory = fs.readdirSync(currentPath, { withFileTypes: true });

  const directoryList = Array.from([".", ".."]);
  const fileList = Array.from([]);

  for (const d of directory) {
    if (d.isDirectory())
      directoryList.push(d.name);
    else if (d.isFile())
      fileList.push(d.name);
  }

  return { path: currentPath, dirs: directoryList, files: fileList };
}

function createDirectory(pathDir) {
  const currentPath = path.resolve(pathDir);
  if (fs.existsSync(currentPath)) {
    console.log("Directory '%s' exists", pathDir);
  } else {
    fs.mkdirSync(currentPath);
    console.log("Created '%s' successfully", pathDir);
  }

}

function removeObject(pathDir) {
  const currentPath = path.resolve(pathDir);
  if (fs.existsSync(currentPath)) {
    fs.rmSync(currentPath, { recursive: true });
    console.log("Removed '%s'", currentPath);
  } else {
    console.log("'%s' did not exist", currentPath);
  }
}

function touchFile(pathFile) {
  fs.writeFileSync(pathFile, "");
  console.log("File '%s' created successfully", pathFile);
}

module.exports = {
  getListDir,
  createDirectory,
  removeObject,
  touchFile
};
