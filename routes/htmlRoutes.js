var db = require("../models");
module.exports = function (app) {
  // Load Home page
  app.get("/", function (req, res) {
    console.log("user: " + req.user);
    console.log("authenticated: " + req.isAuthenticated());
    res.render("homepage");
  });

  // Registration Page
  app.get("/register", function (req, res) {
    res.render("register", {
      title: "Registration"
    });
  });

  // Login Page
  app.get("/login", function (req, res) {
    res.render("login", {
      title: "Login", message: req.flash("error")
    });
  });

  // Profile Page including all user Info
  app.get("/profile", authenticationMiddleware(), function (req, res) {
    db.User.findAll({
      where: {
        id: req.session.passport.user
      },
      include: [{ all: true }],
      order: [
        [db.Experience, 'entryDate', 'DESC'],
        [db.Studies, 'entryDateSchool', 'DESC'],
      ]
    }).then(function (results) {
      // console.log(results[0].dataValues);
      // eslint-disable-next-line camelcase
      res.render("profile", { data: results[0] });
    });
  });

  // Preview Page
  app.get("/print", authenticationMiddleware(), function (req, res) {
    db.User.findAll({
      where: {
        id: req.session.passport.user
      },
      include: [{ all: true }],
      order: [
        [db.Experience, 'entryDate', 'DESC'],
        [db.Studies, 'entryDateSchool', 'DESC'],
      ]
    }).then(function (results) {
      // console.log(results[0].dataValues);
      // eslint-disable-next-line camelcase
      res.render("print", { data: results[0] });
    });
  });

  // JSON Route to load Preview Page
  app.get("/print/all", authenticationMiddleware(), function (req, res) {
    db.User.findAll({
      where: {
        id: req.session.passport.user
      },
      include: [{ all: true }],
      order: [
        [db.Experience, 'entryDate', 'DESC'],
        [db.Studies, 'entryDateSchool', 'DESC'],
      ]
    }).then(function (results) {
      // console.log(results[0].dataValues);
      // eslint-disable-next-line camelcase
      return res.json(results);
    });
  });

  // Logout Page
  app.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy(function () {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
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
