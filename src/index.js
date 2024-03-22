const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars").engine;
const app = express();
const port = 3000;

// HTTP Logger
app.use(morgan("combined"));

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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
