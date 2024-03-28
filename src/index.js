const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { log } = require("console");
const { getHomeController, MainHome } = require("./controller/Homecontroller");
require("dotenv").config();
const handlebars = require("express-handlebars").engine;
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

console.log(">>> check env: ", process.env);

// HTTP Logger
app.use(morgan("combined"));

// config static files
app.use(express.static(path.join(__dirname, "public")));

// Template engine
app.engine(
  "hbs",
  handlebars({
    // config lại tên đuôi phai thay vi: handlebars -> hbs
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

// express-handlebars nodejs set views
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", MainHome);

app.get("/news", (req, res) => {
  res.render("news");
});

app.get("/search", (req, res) => {
  res.render("search");
  console.log(req.query);
});

app.get("/home", getHomeController);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});

// Create the connection to database
const connection = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: user,
  password: password,
  database: database,
});

connection.query("SELECT * FROM Users", (err, results, fields) => {
  console.log(">>>> Check: ", results); // results contains rows returned by server
  console.log(">>> Check: ", fields); //
});
