const express = require("express");
const User = require("./src/User");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;
var hbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var session = require("express-session");
const pgp = require("pg-promise")();
const cn = "postgres://postgres:postgres@localhost:5432/makersbnb";
const db = pgp(cn);

// serve everything in the public directory:
app.use(express.static("public"));

// turn JSON in requests to something we can work with:
app.use(bodyParser.json());

// let us set and retrieve cookies for user auth:
app.use(cookieParser());

app.use(
  session({
    secret: "sec",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

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

app.get("/", (req, res, next) => {
  if (req.session.username) {
    res.redirect("/welcome");
    next();
  } else {
    res.render("login");
  }
});

app.get("/signup", (req, res, next) => {
  if (req.session.username) {
    res.redirect("/welcome");
    next();
  } else {
    res.render("signup");
  }
});

app.post("/signup", (req, res) => {
  if (req.session.username) {
    res.redirect("/welcome");
  } else {
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
  }
});

app.post("/login", (req, res, next) => {
  if (req.session.username) {
    res.redirect("/welcome");
  } else {
    db.one(
      "SELECT * from users WHERE username=$1 AND password=crypt($2, password);;",
      [req.body.username, req.body.password]
    )
      .then(user => {
        if (user) {
          req.session.username = req.body.username;
          req.session.userId = user.id;
          res.redirect("/welcome");
          next();
        }
      })
      .catch(() => res.send("No details found"));
  }
});

app.get("/welcome", async (req, res, next) => {
  if (!req.session.username) {
    res.redirect("/");
    next();
  } else {
    var spaces = await db.query("SELECT * from spaces");
    res.render("welcome", { spaces: spaces });
  }
});

app.get("/spaces/:id", (req,res) => {
      var spaceId = req.params.id;   
      getSpaceInfo = () => db.one("SELECT * FROM spaces WHERE id=$1", [spaceId]).then(data => data).catch(() => "no data");
      getBookingInfo = () => db.manyOrNone("SELECT * FROM bookings WHERE spacesId=$1", [spaceId]).then(data => {return data}).catch(() => "no data");

    db.task(async spaceId => {
      const space = await getSpaceInfo(spaceId);
      const booking = await getBookingInfo(spaceId);
      return {space, booking};
   })
   .then(data => {
       res.render("details", {data: data});
   }).catch((err) => err)
});

app.get("/test", (req, res) => {
  res.render("test");
});

app.get("/details", (req, res) => {
  res.render("details");
});


app.get("/logout", function(req, res) {
  req.session.username = null;
  req.session.userId = null;
  res.clearCookie("userId");
  res.redirect("/");
});

app.post("/spaces/:id/book", (req, res) => {
  db.none(
    "INSERT INTO bookings (startdate, enddate, userId, spacesId) VALUES ($1, $2, $3, $4);",
    [req.body.checkIn, req.body.checkOut, req.session.userId, req.params.id]
  ).then(() => {
    res.redirect("/successful")
  }).catch(() => res.send("Could not book"))
})

app.get("/successful", (req, res) => {
  res.render("successful");
});

app.get("/my-properties", (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
  } else {
    db.many("SELECT * FROM spaces WHERE userId=$1", [req.session.userId])
      .then((data) => res.send(data))
      .catch(err => res.send(err));
      // .then((data) => res.render("myProperties", {data: data}))
      // .catch((err) => res.render("error"));
  }
});

app.get("/my-bookings", (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
  } else {
    db.many("SELECT * FROM bookings WHERE userId=$1", [req.session.userId])
      // .then((data) => res.send(data))
      // .catch(err => res.send(err));
      .then((data) => res.render("my-bookings", {bookings: data}))
      .catch((err) => res.render("error"));
  }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

