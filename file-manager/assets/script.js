document.body.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

function emitChangeDirectory(path) {
  const url = "http://localhost:3000";
  const hiddenForm = document.createElement("form");
  hiddenForm.method = "post";
  hiddenForm.action = url;

  let hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "cwd";
  hiddenInput.value = path;
  hiddenForm.appendChild(hiddenInput);

  document.body.appendChild(hiddenForm);

  hiddenForm.submit();
}

function handleEnter(event, path) {
  if (event.key == "Enter") {
    const url = "http://localhost:3000";
    const hiddenForm = document.createElement("form");
    hiddenForm.method = "post";
    hiddenForm.action = url;

    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "cwd";
    hiddenInput.value = path;
    hiddenForm.appendChild(hiddenInput);

    document.body.appendChild(hiddenForm);

    hiddenForm.submit();
  }
}

function handleNewDirectory() {
  const newDirname = window.prompt("Enter new directory name", "");
  if (newDirname.length === 0)
    return;

  const url = "http://localhost:3000/new-dir";
  const hiddenForm = document.createElement("form");
  hiddenForm.method = "post";
  hiddenForm.action = url;

  let hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "name";
  hiddenInput.value = newDirname;
  hiddenForm.appendChild(hiddenInput);

  document.body.appendChild(hiddenForm);

  hiddenForm.submit();
}

function handleNewFile() {
  const newFilename = window.prompt("Enter new file name", "");
  if (newFilename.length === 0)
    return;

  const url = "http://localhost:3000/new-file";
  const hiddenForm = document.createElement("form");
  hiddenForm.method = "post";
  hiddenForm.action = url;

  let hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "name";
  hiddenInput.value = newFilename;
  hiddenForm.appendChild(hiddenInput);

  document.body.appendChild(hiddenForm);

  hiddenForm.submit();
}

function handleDelete() {
  const deleteName = window.prompt("Enter file or directory name to be deleted", "");
  if (deleteName.length === 0)
    return;

  const url = "http://localhost:3000/delete";
  const hiddenForm = document.createElement("form");
  hiddenForm.method = "post";
  hiddenForm.action = url;

  let hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "name";
  hiddenInput.value = deleteName;
  hiddenForm.appendChild(hiddenInput);

  document.body.appendChild(hiddenForm);

  hiddenForm.submit();
}
