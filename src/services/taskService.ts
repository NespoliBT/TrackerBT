import axios from "axios";

interface Task {
  desc: string;
  hours: number;
  date: Date;
}

axios.defaults.baseURL = "http://localhost:3001";

export module taskService {
  export async function createTask(task: Task) {
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
          let { taskElement, formattedDate } = createTaskElement(task, data);
          resolve({ taskElement, group: { id: groupID, date: formattedDate } });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function createGroup(id: number, date: string, hours: number) {
    let groupElement = document.createElement("div");
    groupElement.setAttribute("class", "group");
    groupElement.setAttribute("id", id + "");

    groupElement.addEventListener("click", (e) => {
      let target = <HTMLElement>e.currentTarget;
      const tasks = document.getElementById("tasks");
      tasks.setAttribute("currentGroup", target.id);
    });

    groupElement.innerHTML = `
      <p class="groupDate">${date}</p>
      <p class="groupHours">${hours} H</p>
    `;

    return groupElement;
  }

  export async function getTasks(group: number) {
    return new Promise((resolve, reject) => {
      axios
        .get("/tasks", {
          params: {
            group,
          },
        })
        .then(({ data }) => {
          let tasksArray = [];
          data.map((task, i) => {
            let taskData = createTaskElement(task, { id: task.id, group });

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
  export async function getGroups() {
    return new Promise((resolve, reject) => {
      axios
        .get("/groups")
        .then(({ data }) => {
          let groupsArray = [];
          data.map((group) => {
            groupsArray.push(
              taskService.createGroup(group.id, group.date, group.hours)
            );
          });
          resolve(groupsArray);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

function createTaskElement(task: Task, data: any) {
  let taskElement = document.createElement("div");
  let deleteElement = document.createElement("div");
  let date = new Date(Number(task.date));
  let formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  deleteElement.setAttribute("class", "deleteElement");
  deleteElement.innerHTML = "";
  deleteElement.addEventListener("click", () => {
    deleteTask(Number(taskElement.id), Number(data.group));
  });

  taskElement.setAttribute("class", "task newTask");
  taskElement.setAttribute("id", data.id);
  taskElement.innerHTML = `
            <div class="taskDesc">${task.desc}</div>
            <div class="taskHours">${task.hours} H</div>
            <div class="taskDate">${formattedDate}</div>
          `;

  taskElement.appendChild(deleteElement);

  return { taskElement, formattedDate };
}

function deleteTask(id: number, groupID: number) {
  axios
    .delete("/tasks/delete", {
      params: {
        id,
      },
    })
    .then(() => {
      const tasks = document.getElementById("tasks");
      let tasksArray = Array.from(tasks.children);

      tasksArray.forEach((task) => {
        if (Number(task.id) === id) {
          task.classList.add("removing");
          setTimeout(() => {
            task.remove();

            if (tasks.innerHTML === "") {
              deleteGroup(groupID);
            }
          }, 500);
        }
      });
    });
}

function deleteGroup(id: number) {
  axios
    .delete("/groups/delete", {
      params: {
        id,
      },
    })
    .then(() => {
      const groups = document.getElementById("groups");
      let groupsArray = Array.from(groups.children);

      groupsArray.forEach((group) => {
        if (Number(group.id) === id) {
          group.classList.add("removing");

          setTimeout(() => {
            group.remove();
          }, 500);
        }
      });
    });
}
