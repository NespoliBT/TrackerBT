const { app, BrowserWindow } = require("electron");
let win;
require("./server");

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Load index.html
  win.loadFile("./dist/index.html");
}

app.whenReady().then(createWindow);
