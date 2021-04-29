import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export module groupService {
  /**
   * Given a group's attributes it returns and HTML element with those attributes.
   *
   * @function createGroup
   *
   * @param id {Number} - The soon to be created group id.
   * @param date {String} - The date under which the tasks are grouped [Format: dd/mm/yyyy].
   * @param hours {Number} - The hours of the first task of the group.
   *
   * @returns {Element} groupElement.
   */
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
      <p class="groupHours"><span>${hours}</span> H</p>
    `;

    return groupElement;
  }

  /**
   * This function returns all saved groups in an array.
   *
   * @async
   * @function getGroups
   *
   * @returns {Promise} An array with all the groups that have been saved.
   */
  export async function getGroups() {
    return new Promise((resolve, reject) => {
      axios
        .get("/groups")
        .then(({ data }) => {
          let groupsArray = [];

          let orderedData = data.sort((a, b) => {
            let aDate = a.date.split("/");
            aDate = new Date(aDate[2], aDate[1] - 1, aDate[0]).getTime();

            let bDate = b.date.split("/");
            bDate = new Date(bDate[2], bDate[1] - 1, bDate[0]).getTime();
            
            return aDate - bDate;
          });

          orderedData.map((group) => {
            groupsArray.push(
              groupService.createGroup(group.id, group.date, group.hours)
            );
          });

          resolve(groupsArray);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * This function returns a group's attributes and it's corresponding element
   * given the group's identifier.
   *
   * @function getGroupByID
   *
   * @param id {Number} - The group's ID
   *
   * @returns {Object} The group's date, hours and HTML element.
   */
  export function getGroupByID(id: number) {
    const groups = document.getElementById("groups");
    let groupsArray = Array.from(groups.children);

    let date: string, hours: number, element: Element;

    groupsArray.map((group) => {
      if (Number(group.id) === id) {
        date = group.children.item(0).innerHTML;
        hours = Number(group.children.item(1).children.item(0).innerHTML);
        element = group;
      }
    });

    return {
      date,
      hours,
      element,
    };
  }

  /**
   * Deletes a group given it's HTML element
   *
   * @function deleteGroup
   *
   * @param group {Element} - Used to find the ID and animate the deletion
   */
  export function deleteGroup(group: Element) {
    let id = group.id;

    axios
      .delete("/groups/delete", {
        params: {
          id,
        },
      })
      .then(() => {
        group.classList.add("removing");
        setTimeout(() => {
          group.remove();
        }, 500);
      });
  }
}
