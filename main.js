const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");
require("./server/server");
require("./services/taskService");
let win;

ipcMain.on("askQrCode", (event, arg) => {
  axios
    .get("http://localhost:3001/ipaddress")
    .then(function ({ data }) {
      event.reply("qrCode", data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
