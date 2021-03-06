import "./scss/index.scss";
import { taskService } from "./services/taskService";
import { groupService } from "./services/groupService";

document.addEventListener("DOMContentLoaded", () => {
  // Save important elements as variables for later use
  const newTask = document.getElementById("newTask");
  const taskDesc = <HTMLInputElement>document.getElementById("taskDesc");
  const hourSlider = <HTMLInputElement>document.getElementById("hourSlider");
  const hourLabel = document.getElementById("hourLabel");
  const tasks = document.getElementById("tasks");
  const groups = document.getElementById("groups");
  let currentGroup = Number(tasks.getAttribute("currentGroup"));
  let groupIDs = [];

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type == "attributes") {
        currentGroup = Number(tasks.getAttribute("currentGroup"));

        taskService.getTasks(currentGroup).then((tasksArray: Element[]) => {
          tasks.innerHTML = "";

          tasksArray.map((task) => {
            tasks.appendChild(task);
          });
        });
      }
    });
  }).observe(tasks, {
    attributes: true,
  });

  taskService.getTasks(currentGroup).then((tasksArray: Element[]) => {
    tasksArray.map((task) => {
      tasks.appendChild(task);
    });
  });

  groupService.getGroups().then((groupsArray: Element[]) => {
    groupsArray.forEach((group) => {
      groups.appendChild(group);
    });
  });

  hourSlider.addEventListener("input", () => {
    hourLabel.innerHTML = hourSlider.value;
  });

  newTask.addEventListener("submit", (event) => {
    event.preventDefault();
    let desc = taskDesc.value;
    let hours = Number(hourSlider.value);
    let date = new Date();
    currentGroup = Number(tasks.getAttribute("currentGroup"));

    if (taskDesc.value) {
      let task = { desc, hours, date };
      taskService
        .createTask(task)
        .then(
          (data: {
            taskElement: HTMLElement;
            group: { id: number; date: string };
            error: string;
          }) => {
            if (data.taskElement) {
              let groupsArray = Array.from(groups.children);

              groupsArray.forEach((group) => {
                groupIDs.push(Number(group.id));
              });

              if (!groupIDs.includes(data.group.id)) {
                let groupElement: HTMLElement = groupService.createGroup(
                  data.group.id,
                  data.group.date,
                  task.hours
                );

                groups.appendChild(groupElement);
              } else {
                let group = groupService.getGroupByID(data.group.id);
                group.element.classList.add("pop");

                let groupHoursElement = group.element.children
                  .item(1)
                  .children.item(0);

                groupHoursElement.innerHTML = group.hours + task.hours + "";

                setTimeout(() => {
                  group.element.classList.remove("pop");
                }, 500);
              }

              if (currentGroup === data.group.id) {
                tasks.appendChild(data.taskElement);
              }
            } else {
              throw new Error(data.error);
            }
          }
        );

      taskDesc.value = "";
      hourSlider.value = "0";
      hourLabel.innerHTML = "0";
    }
  });
});
