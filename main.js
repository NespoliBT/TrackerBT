const { app, BrowserWindow, ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/data/Database.db");
require("electron-reload")(__dirname);

let win;

db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  hours INTEGER
  )`);

tasks = {};
const updateTasks = () => {
  db.serialize(function () {
    db.all("SELECT * FROM tasks", function (err, rows) {
      tasks = rows;
    });
  });
};

ipcMain.on("askTasks", (event) => {
  updateTasks();
  event.reply("sendTasks", tasks);
});

ipcMain.on("addTask", (event, arg) => {
  if (arg.titoloValue && arg.sliderValue) {
    db.run(
      `INSERT INTO tasks(title, hours) VALUES(?, ?)`,
      [arg.titoloValue, arg.sliderValue],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    );
  }
  updateTasks();
  event.reply("sendTasks", tasks);
});
ipcMain.on("deleteTask", (event, arg) => {
  db.run("DELETE FROM tasks WHERE id=?", arg);
  updateTasks();
  event.reply("sendTasks", tasks);
});
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  updateTasks();
  // and load the index.html of the app.
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
