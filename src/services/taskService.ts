import axios from "axios";
import { groupService } from "./groupService";

axios.defaults.baseURL = "http://localhost:3001";

export module taskService {
  /**
   * Adds the given task to the database.
   * Creates the task element.
   * Calls the createGroup function if there is no group to assign the task to.
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
    let desc: string, hours: number, date: string, element: Element;

    tasksArray.map((task) => {
      if (Number(task.id) === id) {
        desc = task.children.item(0).innerHTML;
        hours = Number(task.children.item(1).children.item(0).innerHTML);
        date = task.children.item(2).innerHTML;
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
    editTask(Number(taskElement.id), Number(data.groupID));
  });

  taskElement.setAttribute("class", "task newTask");
  taskElement.setAttribute("id", data.taskID);
  taskElement.innerHTML = `
            <div class="taskDesc">${task.desc}</div>
            <div class="taskHours" id="taskHours"><span>${task.hours}</span> H</div>
            <div class="taskDate">${formattedDate}</div>
          `;

  taskElement.appendChild(editElement);

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
 * @param groupID {Number}
 *
 */
function editTask(taskID: number, groupID: number) {
  const leftPanel = document.getElementsByClassName("leftPanel")[0];
  let editUI = document.createElement("div");
  let task = taskService.getTaskByID(taskID);
  let group = taskService.getTaskByID(groupID);

  editUI.setAttribute("class", "editUI");

  leftPanel.appendChild(editUI);
}
