var db = require("../models");
var scripts = [{ script: '/js/getEvents.js'}];
// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    console.log(req.user)  
    next();
  } else {
    console.log("authentication failed")
      res.redirect("/");
  }
}
module.exports = function (app,passport) {
  // Load index page
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!"
      });
    });
  });

  app.get("/photos", isUserAuthenticated,function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("photos", {
        user: req.user,
        msg: "Welcome!"
      });
    });
  });

  app.get("/profile", isUserAuthenticated,function (req, res) {
      res.render("profile", {
        user: req.user
      });
  });

  app.get("/menu", isUserAuthenticated,function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("menu", {
        //TODO: with HANDLEBARS ONLY
        //eventsArr = req.events in area from ticketmaster,
        user: req.user,
        msg: "Welcome!"
      });
    });
  });


  app.get("/camera", isUserAuthenticated,function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("camera", {
        user: req.user,
        msg: "Welcome!"
      });
    });
  });



  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });



  // Secret route


  // Logout route
  app.get('/logout', isUserAuthenticated,(req, res) => {
    req.logout();
    res.redirect('/');
  });

};
