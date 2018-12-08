var db = require("../models");

module.exports = function (app, passport) {

  //USER API ROUTES//

  // Get all users 
  //probably unnecesary
  app.get("/api/users/", function (req, res) {
    db.User.findAll({
      include: [db.Shows]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  //get user by userId
  app.get("/api/users/:userId", function (req, res) {
    db.User.findOne({
      include: [db.Shows],
      where: {
        userId: req.params.userId
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/users/", function (req, res) {
    db.User.findOrCreate({
      where: {userId: req.body.userId,userName:req.body.userName}
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Delete an user by id
  app.delete("/api/users/:ids", function (req, res) {
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
  app.get("/api/shows/", function (req, res) {
    var query = {};
    if(req.query.userName){
      query.UserName= req.query.userName;
    }
    db.Shows.findAll({where: query, include: db.User}).then(function (dbEvent) {
     res.json(dbEvent);
    });
  });
  //upload photo to photos array in given event
  // app.put('/events/:event_id', function (req, res, next) {
  //   db.Shows.update(
  //     {eventId: req.params.event_id},
  //     {returning: true, where: {eventId: req.params.event_id} }
  //   )
  //   .then(function([ rowsUpdate, [updatedBook] ]) {
  //     res.json(updatedBook)
  //   })
  //   .catch(next)
  //  })
  //get specific event by eventId
  app.get("/api/shows/:event_id", function (req, res) {
    db.Shows.findOne({
      where: {
        eventId: req.params.event_id
      },
      include:[db.User]
    }).then(dbEvent => {
      res.json(dbEvent);
    });
  });

  app.post("/api/shows/", function (req, res) {
    console.log(req.body);
    db.Shows.create(
      req.body
    ).then(function (dbEvent) {
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
  app.get("/api/photos/", function (req, res) {
    db.Photo.findAll({}).then(function (dbPhotos) {
      res.json(dbPhotos);
    })
  });

  //get all photos from an event by eventId
  app.get("/api/photos/:eventId", function (req, res) {
    db.Photo.findAll({
      where: {
        eventFk: req.params.eventId
      }
    }).then(function (dbPhotos) {
      res.json(dbPhotos);
    });
  });



};