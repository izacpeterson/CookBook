const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

app.use(express.static("dist"));
app.use(express.json());

app.get("/api/recipe", (req, res) => {
  res.json({
    title: "",
    description: "",
    directions: [],
    ingredients: [],
  });
});
app.post("/api/new", (req, res) => {
  console.log(req.body);
});

app.listen(8080, () => {
  console.log("Server Up");
});
