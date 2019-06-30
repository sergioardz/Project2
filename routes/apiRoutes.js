var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Log-in user and Initiate session
  app.post("/login", passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  // Create a new user
  app.post("/register", function(req, res) {
    req.checkBody("username", "Username field cannot be empty.").notEmpty();
    req
      .checkBody("username", "Username must be between 4-15 characters long.")
      .len(4, 15);
    req
      .checkBody("email", "The email you entered is invalid, please try again.")
      .isEmail();
    req
      .checkBody(
        "email",
        "Email address must be between 4-100 characters long, please try again."
      )
      .len(4, 100);
    req
      .checkBody("password", "Password must be between 8-100 characters long.")
      .len(8, 100);
    req
      .checkBody(
        "password",
        "Password must include one lowercase character, one uppercase character, a number and a special character."
      )
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
        "i"
      );
    req
      .checkBody("passwordMatch", "Passwords do not match, please try again.")
      .equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      // console.log("errors: " + JSON.stringify(errors));
      res.render("register", {
        title: "Registration Error",
        errors: errors
      });
    } else {
      db.User.create(req.body).then(function() {
        res.redirect("/");
      }).catch(function(err) {
        // console.log(err);
        res.render("register", {
          title: "Registration Error",
          errors: err,
          message: "That username is already registered. Try another one."
        });
      });
    }
  });

  // CREATE Routes for each Model/Table
  app.post("/general", authenticationMiddleware(), function (req, res) {
    db.GeneralInfo.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/experience", authenticationMiddleware(), function (req, res) {
    db.Experience.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/skills", authenticationMiddleware(), function (req, res) {
    db.Skills.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/languages", authenticationMiddleware(), function (req, res) {
    db.Languages.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/studies", authenticationMiddleware(), function (req, res) {
    db.Studies.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  // UPDATE Routes for each Model/Table

  // DELETE Routes for each Model/Table
  app.post("/deletegeneral/:id", function (req, res) {
    db.GeneralInfo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });

  app.post("/deleteexp/:id", function (req, res) {
    db.Experience.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });

  app.post("/deletestudies/:id", function (req, res) {
    db.Studies.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });

  app.post("/deleteskills/:id", function (req, res) {
    db.Skills.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });

  app.post("/deletelanguages/:id", function (req, res) {
    db.Languages.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });

};

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(
      "req.session.passport.user: " + JSON.stringify(req.session.passport)
    );
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };
}

passport.serializeUser(function(userId, done) {
  done(null, userId);
});

passport.deserializeUser(function(userId, done) {
  done(null, userId);
});
