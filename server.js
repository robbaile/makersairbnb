const express = require("express");
const User = require("./src/User");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;
var hbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");

const pgp = require("pg-promise")();
const cn = "postgres://postgres:postgres@localhost:5432/makersbnb";
const db = pgp(cn);

// serve everything in the public directory:
app.use(express.static("public"));

// turn JSON in requests to something we can work with:
app.use(bodyParser.json());

// let us set and retrieve cookies for user auth:
app.use(cookieParser());

// turn forms in requests to something we can work with:
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);

app.get("/", (req, res) => res.render("login"));

app.get("/signup", (req, res) => res.render("signup"));

app.post("/signup", (req, res) => {
  if (req.cookies.userId) {
    res.redirect("/welcome");
  }
  db.none(
    "INSERT INTO users (email, password, username) VALUES ($1, crypt($2, gen_salt('bf')), $3);",
    [req.body.email, req.body.password, req.body.username]
  )
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.send("error");
    });
});

app.post("/login", (req, res) => {
  if (req.cookies.userId) {
    res.redirect("/welcome");
  }
  db.one(
    "SELECT * from users WHERE username=$1 AND password=crypt($2, password);;",
    [req.body.username, req.body.password]
  )
    .then(user => {
      if (user) {
        res.cookie("userId", user.id);
        res.redirect("/welcome");
      }
    })
    .catch(() => res.send("No details found"));
});

app.get("/welcome", (req, res) => {
  if (!req.cookies.userId) {
    res.redirect("/");
    next();
  }
  db.many("SELECT * from spaces").then((spaces) => {
    res.render("welcome", {spaces: spaces})
  });
});

app.get("/test", (req, res) => {
  res.render("test");
});

app.get("/logout", function(req, res) {
  req.session = null;
  res.clearCookie("userId"); //Inside a callback… bulletproof!
  res.redirect("/");
});
app.get("/details", function(req, res) { 
  res.render("details")
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/details2", function(req, res) { 
  res.render("details2")
});