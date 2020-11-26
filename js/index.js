const { ipcRenderer } = require("electron");
var QRCode = require("qrcode");

// Todo better comments

// Create Task
function createTask(task, fatherElement) {
  // Style date
  date = new Date(Number(task.date));
  taskElement = document.createElement("div");
  taskElement.setAttribute("class", "task");
  taskElement.setAttribute("id", task.id);

  // Style title
  titleElement = document.createElement("div");
  titleElement.setAttribute("class", "taskTitle");
  titleElement.textContent = task.title;

  // Style hours
  hoursElement = document.createElement("div");
  hoursElement.setAttribute("class", "taskHours");
  hoursElement.textContent = task.hours + " H";

  // Style date
  dateElement = document.createElement("div");
  dateElement.setAttribute("class", "taskDate");
  dateElement.setAttribute("contenteditable", "true");
  dateElement.textContent =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  dateElement.setAttribute("oninput", "editDate(this)");

  // Style delete elements
  deleteElement = document.createElement("div");
  deleteElement.setAttribute("class", "deleteElement");
  deleteElement.setAttribute("onclick", "deleteTask(this)");
  deleteElement.textContent = "";

  // Append all elements
  taskElement.appendChild(titleElement);
  taskElement.appendChild(hoursElement);
  taskElement.appendChild(dateElement);
  taskElement.appendChild(deleteElement);
  fatherElement.appendChild(taskElement);
}

// Create Group
function createGroup(group) {
  let date = new Date(Number(group[0].date));
  let groupElement = document.createElement("div");
  groupElement.setAttribute("class", "group");
  groupElement.textContent =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  groupElement.setAttribute("onclick", "openGroup(this)");

  let groupTasksElement = document.createElement("div");
  groupTasksElement.setAttribute("class", "groupTasks");

  let closeGroup = document.createElement("div");
  closeGroup.setAttribute("class", "closeGroup");
  closeGroup.setAttribute("onclick", "closeGroup(this)");
  closeGroup.textContent = "";
  groupTasksElement.appendChild(closeGroup);

  group.forEach((task) => {
    createTask(task, groupTasksElement);
  });

  tasksCompleted.appendChild(groupElement);
  tasksCompleted.appendChild(groupTasksElement);
}

// Edit date
function editDate(el) {
  window.addEventListener("click", function (e) {
    if (!el.contains(e.target)) {
      id = el.parentNode.id;
      newDate = el.innerHTML;
      ipcRenderer.send("updateDate", { id, newDate });
    }
    location.reload();
  });
}

// Delete task
function deleteTask(el) {
  id = el.parentNode.id;
  el.parentNode.remove();
  ipcRenderer.send("deleteTask", id);
}

function openGroup(el) {
  el.nextSibling.classList.add("open");
}

function closeGroup(el) {
  el.parentNode.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  addBtn = document.getElementById("addBtn");
  titolo = document.getElementById("titolo");
  slider = document.getElementById("hourSlider");
  sliderLabel = document.getElementById("sliderLabel");
  tasksCompleted = document.getElementById("tasksCompleted");
  content = document.getElementById("content");
  qrcode = document.getElementById("qrcode");
  qrCodeContainer = document.getElementById("qrCodeContainer");
  newTaskPopup = document.getElementById("newTaskPopup");

  // QRCode
  qrcode.addEventListener("click", () => {
    if (qrCodeContainer.classList.contains("active")) {
      qrCodeContainer.classList.remove("active");
    } else {
      qrCodeContainer.classList.add("active");
    }
  });

  // Hour slider
  slider.addEventListener("input", () => {
    sliderLabel.innerHTML = slider.value + " H";
  });

  // Submit button
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sliderValue = slider.value;
    titoloValue = titolo.value;
    dateValue = new Date();
    ipcRenderer.send("addTask", { titoloValue, sliderValue, dateValue });
    slider.value = 0;
    titolo.value = "";
    sliderLabel.innerHTML = "0 H";
    newTaskPopup.classList.add("pop");
    setTimeout(() => {
      newTaskPopup.classList.remove("pop");
    }, 1000);
  });

  ipcRenderer.send("askTasks");
  ipcRenderer.send("askQrCode");
});

// "Routes"
ipcRenderer.on("qrCode", (event, arg) => {
  // QRCode options
  var opts = {
    errorCorrectionLevel: "H",
    type: "svg",
    quality: 0.1,
    margin: 1,
    color: {
      dark: "#212931",
      light: "#85ba86",
    },
  };

  // QRCode creation
  QRCode.toString(arg, opts, function (err, url) {
    document.getElementById("qrcode").innerHTML = url;
  });
});

// Todo make services

ipcRenderer.on("sendTasks", (event, arg) => {
  let tasks = arg;
  console.log(tasks);
  tasks.sort((a, b) => a.date - b.date);
  let j = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let group = [];
    let finishedGroup = false;

    while (tasks[j + 1] && !finishedGroup) {
      let date = new Date(Number(task.date)).setHours(0, 0, 0, 0);
      let nextDate = new Date(Number(tasks[j + 1].date)).setHours(0, 0, 0, 0);

      if (i === 0) group.push(task);

      if (date == nextDate) {
        group.push(tasks[j + 1]);
        j += 1;
        i = j;
      } else {
        finishedGroup = true;
      }
    }
    console.log(group);
    if (group.length > 2) createGroup(group);
    else createTask(group[0], tasksCompleted);
  }
});

ipcRenderer.on("newTaskID", (event, arg) => {
  createTask(arg, tasksCompleted);
});
