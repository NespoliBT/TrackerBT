const { ipcRenderer } = require("electron");
var QRCode = require("qrcode");

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

function deleteTask(el) {
  id = el.parentNode.id;
  ipcRenderer.send("deleteTask", id);
}

document.addEventListener("DOMContentLoaded", function () {
  addBtn = document.getElementById("addBtn");
  titolo = document.getElementById("titolo");
  slider = document.getElementById("hourSlider");
  sliderLabel = document.getElementById("sliderLabel");
  tasksCompleted = document.getElementById("tasksCompleted");
  content = document.getElementById("content");
  qrcode = document.getElementById("qrcode");
  qrCodeContainer = document.getElementById("qrCodeContainer");

  qrcode.addEventListener("click", () => {
    if (qrCodeContainer.classList.contains("active")) {
      qrCodeContainer.classList.remove("active");
    } else {
      qrCodeContainer.classList.add("active");
    }
  });
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
ipcRenderer.send("askQrCode");

ipcRenderer.on("qrCode", (event, arg) => {
  console.log(arg);
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
  QRCode.toString(arg, opts, function (err, url) {
    console.log(url);
    document.getElementById("qrcode").innerHTML = url;
  });
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
    date = new Date(Number(task.date));
    taskElement = document.createElement("div");
    taskElement.setAttribute("class", "task");
    taskElement.setAttribute("id", task.id);

    titleElement = document.createElement("div");
    titleElement.setAttribute("class", "taskTitle");
    titleElement.textContent = task.title;

    hoursElement = document.createElement("div");
    hoursElement.setAttribute("class", "taskHours");
    hoursElement.textContent = task.hours + " H";

    dateElement = document.createElement("div");
    dateElement.setAttribute("class", "taskDate");
    dateElement.setAttribute("contenteditable", "true");
    dateElement.textContent =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    dateElement.setAttribute("oninput", "editDate(this)");

    deleteElement = document.createElement("div");
    deleteElement.setAttribute("class", "deleteElement");
    deleteElement.setAttribute("onclick", "deleteTask(this)");
    deleteElement.textContent = "";

    taskElement.appendChild(titleElement);
    taskElement.appendChild(hoursElement);
    taskElement.appendChild(dateElement);
    taskElement.appendChild(deleteElement);
    tasksCompleted.appendChild(taskElement);
  });
});
