const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/data/Database.db");

app.use(express.json());
app.use(cors());
const tasksRouter = express.Router();
const groupsRouter = express.Router();
app.use("/tasks", tasksRouter);
app.use("/groups", groupsRouter);

db.run(`

    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        desc TEXT,
        hours INTEGER,
        date TEXT,
        groupID INTEGER
    )

`);

db.run(`

    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT
    )
    
`);

tasksRouter.get("/", (req, res) => {
  db.all(
    "SELECT * FROM tasks WHERE groupID = ?",
    [req.query.groupID],
    function (err, tasks) {
      res.json(tasks);
    }
  );
});

tasksRouter.post("/create", (req, res) => {
  let desc = req.body.desc;
  let hours = req.body.hours;
  let date = new Date(req.body.date);
  let formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  let groupFound;

  db.all(`SELECT * FROM groups`, function (error, groups) {
    if (error) {
      console.log(error);
    } else {
      groups.map((group) => {
        if (group.date === formattedDate) {
          groupFound = group.id;
        }
      });

      if (!groupFound) {
        db.run(
          `INSERT INTO groups (date) VALUES (?)`,
          [formattedDate],
          function () {
            console.log(`A group has been inserted with rowid ${this.lastID}`);
            groupFound = this.lastID;
            insertTask(desc, hours, date, groupFound, res);
          }
        );
      } else {
        insertTask(desc, hours, date, groupFound, res);
      }
    }
  });
});

tasksRouter.post("/update", (req, res) => {
  let id = req.body.id;
  let desc = req.body.desc;
  let hours = req.body.hours;
  let date = new Date(req.body.date);

  let formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  db.all(
    `SELECT id FROM groups WHERE date = ?`,
    [formattedDate],
    function (error, IDs) {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        if (IDs[0]) {
          db.run(
            `
            UPDATE tasks SET desc = ?, hours = ?, date = ?, groupID = ? WHERE id = ?;
          `,
            [desc, hours, Number(date), IDs[0].id, id],
            function (error) {
              if (error) {
                console.log(error);
              } else {
                res.json(IDs[0].id);
              }
            }
          );
        } else {
          db.run(
            `INSERT INTO groups (date) VALUES (?)`,
            [formattedDate],
            function (error) {
              if (error) {
                console.log(error);
              } else {
                let newGroupID = this.lastID;

                console.log(
                  `A group has been inserted with rowid ${newGroupID}`
                );

                db.run(
                  `
                  UPDATE tasks SET desc = ?, hours = ?, date = ?, groupID = ? WHERE id = ?;
                `,
                  [desc, hours, Number(date), newGroupID, id],
                  function (error) {
                    if (error) {
                      console.log(error);
                    } else {
                      res.json(newGroupID);
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

tasksRouter.delete("/delete", (req, res) => {
  db.run(`DELETE FROM tasks where id = ?`, [req.query.taskID], () => {
    res.sendStatus(200);
  });
});

groupsRouter.get("/", (req, res) => {
  let formattedGroups = [];
  db.all("SELECT * FROM groups", function (err, groups) {
    groups.map((group, i) => {
      db.all(
        "SELECT hours FROM tasks WHERE groupID = ?",
        [group.id],
        function (err, taskHours) {
          let totalHours = 0;
          taskHours.map(({ hours }) => {
            totalHours += hours;
          });
          formattedGroups.push({
            ...group,
            hours: totalHours,
          });

          if (i + 1 === groups.length) {
            res.json(formattedGroups);
          }
        }
      );
    });
  });
});

groupsRouter.delete("/delete", (req, res) => {
  db.run(`DELETE FROM groups where id = ?`, [req.query.id], () => {
    res.sendStatus(200);
  });
});

app.listen(3001);

console.log("Listening on port 3001...");

function insertTask(desc, hours, date, groupFound, res) {
  db.run(
    `INSERT INTO tasks(desc, hours, date, groupID) VALUES(?, ?, ?, ?)`,
    [desc, hours, date, groupFound],
    function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log(`A task has been inserted with rowid ${this.lastID}`);

        task = {
          id: this.lastID,
          desc,
          hours,
          date: Number(date),
          group: groupFound,
        };

        res.send(task);
      }
    }
  );
}
