const { ipcMain } = require("electron");
const axios = require("axios");

tasks = {};
updateTasks();

function updateTasks() {
  axios
    .get("http://localhost:3001/tasks")
    .then(function (response) {
      tasks = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

ipcMain.on("deleteTask", (event, arg) => {
  axios.post("http://localhost:3001/tasks/delete", {
    id: arg,
  });
});

ipcMain.on("askTasks", (event) => {
  updateTasks();

  event.reply("sendTasks", tasks);
});

ipcMain.on("updateDate", (event, arg) => {
  dateArray = arg.newDate.split("/");
  dateToInsert = new Date([
    dateArray[1],
    dateArray[0],
    dateArray[2],
    "23:00:00",
  ]);

  if (!isNaN(dateToInsert)) {
    axios.post("http://localhost:3001/date/update", {
      id: arg.id,
      date: dateToInsert,
    });
  }
  updateTasks();
  event.reply("sendTasks", tasks);
});

ipcMain.on("addTask", (event, arg) => {
  if (arg.titoloValue && arg.sliderValue && arg.dateValue) {
    axios
      .post("http://localhost:3001/tasks/new", {
        title: arg.titoloValue,
        hours: arg.sliderValue,
        date: arg.dateValue,
      })
      .then(({ data }) => {
        event.reply("newTaskID", data);
      });
  }
});
