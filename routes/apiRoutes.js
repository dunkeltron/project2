var db = require("../models");

module.exports = function (app, passport) {

//USER API ROUTES//

  // Get all users 
  //probably unnecesary
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  
  //get user by userId
  app.get("/api/users/:userId", function (req, res) {
    db.User.findOne({
      where: {
        userId: req.body.userId
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/users/", function (req, res) {
    const isIdUnique = id =>
      db.User.findOne({
        where: {
          userId : req.body.userId
        }
      })
      .then(token => token !== null)
      .then(isUnique => isUnique)
        if (isIdUnique) {
          db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
          });
        };
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

//EVENT API routes//

  //get all events
  app.get("api/events",function (req,res){
    db.Event.findAll({}).then(function (dbEvent){
      res.json(dbEvent);
    });
  });

  //get specific event by eventId
  app.get("api/events/:eventId",function (req,res){
    db.Event.findOne({
      where: {
        eventId : req.params.eventId
      }
    }).then(function (dbEvent){
      res.json(dbEvent);
    });
  });

  app.post("/api/events/",function (req, res){
    db.Event.create(req.body).then(function (dbEvent) {
      res.json(dbEvent);
    });
  })

//PHOTO API ROUTES//

  //post photo to photo table
  app.post("/api/photos/", function (req, res) {
    db.Photo.create(req.body).then(function (dbPhotos) {
      res.json(dbPhotos);
    });
  });

  //get all photos
  app.get("/api/photos",function (req, res) {
    db.Photo.findAll({}).then(function (dbPhotos){
      res.json(dbPhotos)
    })
  });

  //get Photo by photoId
  app.get("api/events/:photoId",function (req,res){
    db.Event.findOne({
      where: {
        eventId : req.params.photoId
      }
    }).then(function (dbPhotos){
      res.json(dbPhotos);
    });
  });


  
};