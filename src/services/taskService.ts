import axios from "axios";
import { groupService } from "./groupService";

axios.defaults.baseURL = "http://localhost:3001";

export module taskService {
  /**
   * Adds the given task to the database.
   * Creates the task element.
   *
   * @async
   * @function createTask
   *
   * @param task - The attributes of the task that needs to be added.
   *
   * @returns {Promise} - Task HTML element, group id and date
   */
  export async function createTask(task: {
    desc: string;
    hours: number;
    date: Date;
  }) {
    const { desc, hours, date } = task;
    return new Promise((resolve, reject) => {
      axios
        .post("/tasks/create", {
          desc,
          hours,
          date,
        })
        .then(({ data }) => {
          let groupID = data.group;
          let { taskElement, formattedDate } = createTaskElement(task, {
            taskID: data.id,
            groupID: data.group,
          });

          resolve({ taskElement, group: { id: groupID, date: formattedDate } });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Given a group identifier this function returns all the group's tasks.
   *
   * @async
   * @function getTasks
   *
   * @param groupID {Number} - The ID of the group from which the tasks are fetched.
   *
   * @returns {Promise} An array with all the tasks from the given group.
   */
  export async function getTasks(groupID: number) {
    return new Promise((resolve, reject) => {
      axios
        .get("/tasks", {
          params: {
            groupID,
          },
        })
        .then(({ data }) => {
          let tasksArray = [];
          data.map((task, i) => {
            let taskData = createTaskElement(task, {
              taskID: task.id,
              groupID,
            });

            tasksArray.push(taskData.taskElement);
            if (i == Object.keys(data).length - 1) {
              resolve(tasksArray);
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * This function returns a task's attributes and it's corresponding element
   * given the task's identifier.
   *
   * @param id {Number} - The task's ID
   *
   * @returns {Object} The task's description, hours, date and HTML element.
   */
  export function getTaskByID(id: number) {
    const tasks = document.getElementById("tasks");
    let tasksArray = Array.from(tasks.children);
    let desc: string, hours: number, date: Date, element: Element;

    tasksArray.map((task) => {
      if (Number(task.id) === id) {
        let formattedDate = task.children.item(2).innerHTML.split("/");
        desc = task.children.item(0).innerHTML;
        hours = Number(task.children.item(1).children.item(0).innerHTML);
        date = new Date(
          formattedDate[1] + " " + formattedDate[0] + " " + formattedDate[2]
        );
        element = task;
      }
    });

    return {
      desc,
      hours,
      date,
      element,
    };
  }

  export async function editTask(
    id: number,
    date: Date,
    desc: string,
    hours: number
  ) {
    return new Promise((resolve, reject) => {
      axios
        .post("/tasks/update", {
          id,
          date,
          desc,
          hours,
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

/**
 * Creates an HTML Element given the task's attributes
 *
 * @function createTaskElement
 *
 * @param task - The task attributes
 * @param data - An object that contains both the task's ID and the group's ID
 *
 * @returns {Object} HTML task element and a formatted date
 */
function createTaskElement(
  task: { desc: string; hours: number; date: Date },
  data: { taskID: string; groupID: number }
) {
  let taskElement = document.createElement("div");
  let deleteElement = document.createElement("div");
  let editElement = document.createElement("div");

  let date = new Date(Number(task.date));
  let formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  editElement.setAttribute("class", "editElement");
  editElement.innerHTML = "";
  editElement.addEventListener("click", () => {
    editTask(Number(taskElement.id), data.groupID);
  });

  deleteElement.setAttribute("class", "deleteElement");
  deleteElement.innerHTML = "";
  deleteElement.addEventListener("click", () => {
    deleteTask(Number(taskElement.id), data.groupID);
  });

  
  taskElement.setAttribute("class", "task newTask");
  taskElement.setAttribute("id", data.taskID);
  taskElement.innerHTML = `
            <div class="taskDesc">${task.desc}</div>
            <div class="taskHours" id="taskHours"><span>${task.hours}</span> H</div>
            <div class="taskDate">${formattedDate}</div>
          `;

  taskElement.appendChild(editElement);
  taskElement.appendChild(deleteElement);

  return { taskElement, formattedDate };
}

/**
 * Deletes a task given it's ID and the group's ID
 * If the group doesn't have any more tasks it gets deleted as well
 *
 * @function deleteTask
 *
 * @param taskID {Number}
 * @param groupID {Number}
 */
function deleteTask(taskID: number, groupID: number) {
  axios
    .delete("/tasks/delete", {
      params: {
        taskID,
      },
    })
    .then(() => {
      const tasks = document.getElementById("tasks");
      let task = taskService.getTaskByID(taskID);
      let group = groupService.getGroupByID(groupID);

      task.element.classList.add("removing");
      setTimeout(() => {
        task.element.remove();
        let groupHours = group.element.children.item(1).children.item(0);
        let currentHours = Number(groupHours.innerHTML);
        groupHours.innerHTML = currentHours - task.hours + "";

        if (tasks.innerHTML === "") {
          groupService.deleteGroup(group.element);
        }
      }, 500);
    });
}

/**
 * Opens task editing user interface
 *
 * @function editTask
 *
 * @param taskID {Number}
 *
 */
function editTask(taskID: number, groupID: number) {
  const content = document.getElementsByClassName("content")[0];
  let tasks = document.getElementById("tasks");
  let editUI = document.createElement("div");
  let editPanel = document.createElement("form");
  let task = taskService.getTaskByID(taskID);
  let calendar = createCalendar(task);

  editUI.setAttribute("class", "editUI");
  editPanel.setAttribute("class", "editPanel");

  editPanel.innerHTML = `
    <input type="text" id="editTaskDesc" spellcheck="false" value="${task.desc}"/>
    <input
      value="${task.hours}"
      type="range"
      id="editHourSlider"
      step="0.5"
      max="8"
      min="0,5"
    />
    <p class="editHourLabel"><span id="editHourLabel">${task.hours}</span> H</p>
    <button id="editBtn" type="submit">✔</button>
    <button id="exitBtn">✖</button>
  `;

  editPanel.appendChild(calendar);
  editUI.appendChild(editPanel);
  content.appendChild(editUI);

  let editTaskDesc = <HTMLInputElement>document.getElementById("editTaskDesc");
  let editHourSlider = <HTMLInputElement>(
    document.getElementById("editHourSlider")
  );
  let editHourLabel = document.getElementById("editHourLabel");
  let exitBtn = document.getElementById("exitBtn");

  editHourSlider.addEventListener("input", () => {
    editHourLabel.innerHTML = editHourSlider.value;
  });

  exitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    editUI.classList.add("closing");
    setTimeout(() => {
      editUI.remove();
    }, 500);
  });

  editPanel.addEventListener("submit", (e) => {
    e.preventDefault();
    let groups = document.getElementById("groups");
    let currentDate = task.date.getDate();
    let newDateNumber = Number(
      document.getElementsByClassName("selected")[0].innerHTML
    );

    let newDate = new Date(task.date.setDate(newDateNumber));

    taskService
      .editTask(
        taskID,
        newDate,
        editTaskDesc.value,
        Number(editHourSlider.value)
      )
      .then((newGroupID: number) => {
        let newGroup = groupService.getGroupByID(newGroupID);
        let group = groupService.getGroupByID(groupID);

        let groupHoursElement = group.element.children.item(1).children.item(0);

        if (newGroup.element) {
          newGroup.element.classList.add("pop");

          let newGroupHoursElement = newGroup.element.children
            .item(1)
            .children.item(0);

          newGroupHoursElement.innerHTML =
            newGroup.hours + Number(editHourSlider.value) + "";

          setTimeout(() => {
            newGroup.element.classList.remove("pop");
          }, 500);
        } else {
          let formattedDate =
            newDate.getDate() +
            "/" +
            (newDate.getMonth() + 1) +
            "/" +
            newDate.getFullYear();

          let groupElement: HTMLElement = groupService.createGroup(
            newGroupID,
            formattedDate,
            Number(editHourSlider.value)
          );

          groups.appendChild(groupElement);
        }
        if (newDateNumber !== currentDate) {
          task.element.classList.add("removing");
          setTimeout(() => {
            task.element.remove();

            groupHoursElement.innerHTML =
              group.hours - Number(editHourSlider.value) + "";

            if (tasks.innerHTML === "") {
              groupService.deleteGroup(group.element);
            }
          }, 500);
        }
      });
    editUI.classList.add("closing");
    setTimeout(() => {
      editUI.remove();
    }, 500);
  });
}

function createCalendar(task) {
  let calendar = document.createElement("div");
  calendar.setAttribute("class", "calendar");
  calendar.innerHTML = ``;
  let taskDate = task.date;
  let firstDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), 1);
  let lastDay = new Date(taskDate.getFullYear(), taskDate.getMonth() + 1, 0);
  let nOfDays = lastDay.getDate();
  let firstDOTWNumber = firstDay.getDay();

  for (let i = 0; i < firstDOTWNumber; i++) {
    calendar.innerHTML += `
      <div class="blankDay"></div>
    `;
  }

  for (let i = 0; i < nOfDays; i++) {
    let day = document.createElement("div");
    day.classList.add("day");
    day.innerHTML = i + 1 + "";

    day.addEventListener("click", () => {
      document
        .getElementsByClassName("selected")[0]
        .classList.remove("selected");
      day.classList.add("selected");
    });

    if (i === taskDate.getDate() - 1) {
      day.classList.add("selected");
    }

    if ((i + 1 + firstDOTWNumber) % 7) {
      day.classList.add("border");
    }

    calendar.appendChild(day);
  }

  return calendar;
}
