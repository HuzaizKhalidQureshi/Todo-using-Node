const express = require("express");
const ejs = require("ejs");
const path = require("path");
require("./models/db");
const todoModel = require("./models/todoModel");

const sampleRouter = require("./controllers/todo_controller");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(5000, () => {
  console.log("server is listening on port no 5000");
});

app.use("/", sampleRouter);
