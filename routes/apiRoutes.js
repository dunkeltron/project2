var db = require("../models");

module.exports = function (app, passport) {

  //USER API ROUTES//

  // Get all users 
  //probably unnecesary
  app.get("/api/users/", function (req, res) {
    db.User.findAll({
      include: [{
        model: db.Event,
        as: "savedEvents",
        include: [{
          model: db.Photo,
          as: "concertPhotos"
        }]
      }]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  //get user by userId
  app.get("/api/users/:userId", function (req, res) {
    db.User.findOne({
      where: {
        userId: req.body.userId
      },
      include: [{
        model: db.Event,
        as: "savedEvents",
        include: [{
          model: db.Photo,
          as: "concertPhotos"
        }]
      }]
    }).then(function (dbUser) {
      res.json(dbUser);
      // const resObj = dbUser.map(user => {

      //   //tidy up the user data
      //   return Object.assign({}, {
      //     userName: user.userName,
      //     userId: user.userId,
      //     events: user.events.map(event => {

      //       //tidy up the post data
      //       return Object.assign({}, {
      //         eventName: event.eventName,
      //         eventVenue: event.eventVenue,
      //         eventId: event.eventId,
      //         photos: event.comments.map(photo => {

      //           //tidy up the comment data
      //           return Object.assign({}, {
      //             userId: photo.userId,
      //             eventId: photo.eventId,
      //             photoLink: photo.photoLink
      //           })
      //         })
      //       })
      //     })
      //   })
      // });
      // res.json(resObj)
    });
  });

  // Create a new user
  app.post("/api/users/", function (req, res) {
    db.User.findOrCreate({
      where: {userId: req.body.userId, userName:req.body.userName}
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
  app.get("/api/events/", function (req, res) {
    db.Event.findAll({
      include: [{
        model: db.Photo,
        as:"concertPhotos"
      }]
    }).then(function (dbEvent) {
      // const resObj = dbEvent.map(events => {
      //   return Object.assign({}, {
      //     eventName: events.eventName,
      //     eventVenue: events.eventVenue,
      //     eventId: events.eventId,
      //     photos: events.Photos.map(photos => {
      //       return Object.assign({}, {
      //         eventId: photos.eventId,
      //         photoLink: photos.photoLink
      //       })
      //     })
      //   })
      // });
     res.json(dbEvent);
    });
  });
  //upload photo to photos array in given event
  // app.put('/events/:event_id', function (req, res, next) {
  //   db.Event.update(
  //     {eventId: req.params.event_id},
  //     {returning: true, where: {eventId: req.params.event_id} }
  //   )
  //   .then(function([ rowsUpdate, [updatedBook] ]) {
  //     res.json(updatedBook)
  //   })
  //   .catch(next)
  //  })
  //get specific event by eventId
  app.get("/api/events/:event_id", function (req, res) {
    db.Event.findOne({
      where: {
        eventId: req.params.event_id
      },
      include: [{
        model: db.Photo,
        as:"concertPhotos"
      }]
    }).then(dbEvent => {
      // var eventArr = [dbEvent];
      //  const resObj = eventArr.map(events => {
      //    return Object.assign({}, {
      //      eventName: events.eventName,
      //      eventVenue: events.eventVenue,
      //      eventId: events.eventId,
      //      photos: events.Photos.map(photos => {
      //        return Object.assign({}, {
      //          eventId: photos.eventId,
      //          photoLink: photos.photoLink
      //        })
      //      })
      //    })
      //  });
      res.json(dbEvent);
    });
  });

  app.post("/api/events/", function (req, res) {
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