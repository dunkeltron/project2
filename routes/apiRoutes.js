var db = require("../models");

module.exports = function (app, passport) {
  // Get all users
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/users/:id", function (req, res) {
    db.User.findOne({
      where: {
        userId: req.params.id
      }
    }).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new user
  app.post("/api/users/:id", function (req, res) {
    const isIdUnique = id =>
      db.User.findOne({
        where: {
          userId : req.params.id
        }
      })
      .then(token => token !== null)
      .then(isUnique => isUnique)
        if (isIdUnique) {
          db.User.create(req.body).then(function (dbExample) {
            res.json(dbExample);
          });
        };
  });

  app.post("/api/photos", function (req, res) {
    db.Photo.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  // Delete an user by id
  app.delete("/api/user/:ids", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};