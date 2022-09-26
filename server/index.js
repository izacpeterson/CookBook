const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database/recipes.db");

app.use(cors());

app.use(express.static("../app/dist"));
app.use(express.json());

app.get("/api/recipe/:id", (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM recipes WHERE rowid = ${id}`, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      row.ingredients = row.ingredients.split(",");
      row.directions = row.directions.split(",");
      console.log(row);
      res.send(row);
    }
  });
});

app.get("/api/getall", (req, res) => {
  db.all("SELECT rowid, title FROM recipes WHERE pubic = 1", (err, rows) => {
    res.json(rows);
  });
});
app.get("/api/getPrivate", (req, res) => {
  console.log("getPrivate");
  db.all(`SELECT rowid, title FROM recipes WHERE user = '${req.query.uid}'`, (err, rows) => {
    console.log(rows);
    console.log(req.query);
    res.json(rows);
  });
});

app.post("/api/new", (req, res) => {
  console.log(req.body);
  db.exec('insert into recipes (title, desc, directions, ingredients, user) values ("' + req.body.title + '", "' + req.body.desc + '", "' + req.body.directions + '", "' + req.body.ingredients + '", "' + req.body.uid + '")');
});

app.get("/api/clear", (req, res) => {
  clearDB();
  res.json({
    message: "Database cleared",
  });
});

app.get("/api/setPublic", (req, res) => {
  db.exec("UPDATE recipes SET public = 1 WHERE rowid = " + req.query.id);
  res.send("set");
});

app.get("/api/setPrivate", (req, res) => {
  db.exec("UPDATE recipes SET public = 0 WHERE rowid = " + req.query.id);
  res.send("set");
});

function clearDB() {
  db.exec("DELETE FROM recipes");
}

app.listen(8083, () => {
  console.log("Server Up");
});
