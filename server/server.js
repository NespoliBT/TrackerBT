const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/../data/Database.db");
const ip = require("ip");

app.use(express.json());
app.use(cors());

db.run(`

    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        date TEXT,
        hours INTEGER
    )

`);

app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", function (err, notes) {
    res.json(notes);
  });
});

app.post("/tasks/new", (req, res) => {
  title = req.body.title;
  hours = req.body.hours;
  date = new Date(req.body.date);

  db.run(
    `INSERT INTO tasks(title, hours, date) VALUES(?, ?, ?)`,
    [title, hours, date],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      task = {
        id: this.lastID,
        title: title,
        hours: hours,
        date: Number(date),
      };
      res.send(task);
    }
  );
});

app.post("/tasks/delete", (req, res) => {
  id = req.body.id;
  db.run("DELETE FROM tasks WHERE id=?", id);
});

app.post("/date/update", (req, res) => {
  id = req.body.id;
  date = new Date(req.body.date);
  db.run("UPDATE tasks SET date = ? WHERE id = ?", [date, id]);
});

app.get("/ipaddress", (req, res) => {
  res.send(ip.address());
});

app.listen(3001);

console.log("Listening on port 3001...");
