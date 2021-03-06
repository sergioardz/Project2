require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var expressValidator = require("express-validator");

// Athentication
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var MySQLStore = require("express-mysql-session")(session);
var bcrypt = require("bcrypt");
var flash = require('connect-flash');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressValidator());
app.use(express.static("public"));
app.use(flash());

// Update Local or Deployed
// var options = {
//   host: "q3vtafztappqbpzn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   port: 3306,
//   user: "hfsma7f9wx78df3z",
//   password: "m2m15594awcs6n3n",
//   database: "ytp5phvetknqmh5d"
// };

// Update Local or Deployed
var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "exampledb"
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    // Random string generated secret
    secret: "cuzA0rq9AOOupiga",
    // Determines wheter or not the session is updated, even without changes being made
    resave: true,
    store: sessionStore,
    // Creates a cookie whenever a user visits the page, ergo false. Only by login
    saveUninitialized: false
    // cookie: { secure: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

passport.use(
  new LocalStrategy(function (username, password, done) {
    db.User.findAll({
      where: {
        username: username
      }
    }).then(function (dbUser) {
      // console.log(dbUser);
      if (dbUser === undefined || dbUser.length === 0) {
        console.log("Username not found");
        // done(null, false);
        return done(null, false, {
          message: "Username not found."
        });
      } else {
        var hash = dbUser[0].dataValues.password;
        var id = dbUser[0].dataValues.id;
        bcrypt.compare(password, hash, function (err, response) {
          if (response === true) {
            console.log("Successfully Logged-in");
            return done(null, id, {message: "Successfully Logged-in"});
          } else {
            console.log("Password does not match.");
            return done(null, false, {message: "Password does not match."});
          }
        });
      }
    });
  })
);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
