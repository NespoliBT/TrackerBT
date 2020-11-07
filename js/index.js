const { ipcRenderer } = require("electron");
var QRCode = require("qrcode");

// Todo better comments

// Create element
function createTask(task) {
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
  tasksCompleted.appendChild(taskElement);
}

// Edit date
async function editDate(el) {
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
  // Reset tasks
  tasksCompleted.innerHTML = "";

  // Create header element
  headerElement = document.createElement("div");
  headerElement.setAttribute("class", "header");

  // Create activity element
  activityElement = document.createElement("p");
  activityElement.setAttribute("class", "activity");
  activityElement.textContent = "Attività";

  // Create hours element
  hourLabelElement = document.createElement("p");
  hourLabelElement.setAttribute("class", "hours");
  hourLabelElement.textContent = "Ore";

  // Create data element
  dateLabelElement = document.createElement("p");
  dateLabelElement.setAttribute("class", "date");
  dateLabelElement.textContent = "Data";

  // Create append all elements
  headerElement.appendChild(activityElement);
  headerElement.appendChild(hourLabelElement);
  headerElement.appendChild(dateLabelElement);
  tasksCompleted.appendChild(headerElement);

  // Style elements
  arg.forEach((task) => {
    createTask(task);
  });
});

ipcRenderer.on("newTaskID", (event, arg) => {
  createTask(arg);
});
