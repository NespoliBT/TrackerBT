const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");
require("./server/server");

require("electron-reload")(__dirname);

let win;

tasks = {};

const updateTasks = () => {
  axios
    .get("http://localhost:3001/tasks")
    .then(function (response) {
      tasks = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

ipcMain.on("askTasks", (event) => {
  updateTasks();
  event.reply("sendTasks", tasks);
});

ipcMain.on("addTask", (event, arg) => {
  if (arg.titoloValue && arg.sliderValue && arg.dateValue) {
    axios.post("http://localhost:3001/tasks/new", {
      title: arg.titoloValue,
      hours: arg.sliderValue,
      date: arg.dateValue,
    });
  }
  updateTasks();
  event.reply("sendTasks", tasks);
});
ipcMain.on("deleteTask", (event, arg) => {
  axios.post("http://localhost:3001/tasks/delete", {
    id: arg,
  });
  updateTasks();
  event.reply("sendTasks", tasks);
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
  updateTasks();
  // and load the index.html of the app.
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
