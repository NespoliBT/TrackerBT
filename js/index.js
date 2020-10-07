const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", function () {
  addBtn = document.getElementById("addBtn");
  titolo = document.getElementById("titolo");
  slider = document.getElementById("hourSlider");
  sliderLabel = document.getElementById("sliderLabel");
  tasksCompleted = document.getElementById("tasksCompleted");
  content = document.getElementById("content");
  slider.addEventListener("input", () => {
    sliderLabel.innerHTML = slider.value + " H";
  });

  addBtn.addEventListener("click", () => {
    sliderValue = slider.value;
    titoloValue = titolo.value;
    dateValue = new Date();
    ipcRenderer.send("addTask", { titoloValue, sliderValue, dateValue });
  });
  ipcRenderer.send("askTasks");
});
ipcRenderer.on("sendTasks", (event, arg) => {
  tasksCompleted.innerHTML = "";

  headerElement = document.createElement("div");
  headerElement.setAttribute("class", "header");

  activityElement = document.createElement("p");
  activityElement.setAttribute("class", "activity");
  activityElement.textContent = "Attività";

  hourLabelElement = document.createElement("p");
  hourLabelElement.setAttribute("class", "hours");
  hourLabelElement.textContent = "Ore";

  dateLabelElement = document.createElement("p");
  dateLabelElement.setAttribute("class", "date");
  dateLabelElement.textContent = "Data";

  headerElement.appendChild(activityElement);
  headerElement.appendChild(hourLabelElement);
  headerElement.appendChild(dateLabelElement);
  tasksCompleted.appendChild(headerElement);
  arg.forEach((task) => {
    console.log(task.date);
    date = new Date(Number(task.date));
    console.log(date);
    taskElement = document.createElement("div");
    taskElement.setAttribute("class", "task");

    titleElement = document.createElement("div");
    titleElement.setAttribute("class", "taskTitle");
    titleElement.textContent = task.title;

    hoursElement = document.createElement("div");
    hoursElement.setAttribute("class", "taskHours");
    hoursElement.textContent = task.hours + " H";

    dateElement = document.createElement("div");
    dateElement.setAttribute("class", "taskDate");
    dateElement.textContent =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    deleteElement = document.createElement("div");
    deleteElement.setAttribute("class", "deleteElement");
    deleteElement.setAttribute("id", task.id);
    deleteElement.setAttribute("onclick", "deleteTask(this)");
    deleteElement.textContent = "";

    taskElement.appendChild(titleElement);
    taskElement.appendChild(hoursElement);
    taskElement.appendChild(dateElement);
    taskElement.appendChild(deleteElement);
    tasksCompleted.appendChild(taskElement);
  });
});

function deleteTask(el) {
  id = el.id;
  ipcRenderer.send("deleteTask", id);
}
