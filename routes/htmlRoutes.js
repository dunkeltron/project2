var db = require("../models");
// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect("/");
  }
}
module.exports = function (app,passport) {
  // Load index page
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/photos", isUserAuthenticated,function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("photos", {
        user: req.user,
        msg: "Welcome!",
        examples: dbExamples
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
        user: (req.user),
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });


  app.get("/camera", isUserAuthenticated,function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("camera", {
        user: req.user,
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
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
