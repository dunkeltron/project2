require("dotenv").config();
// var keys = require('./keys');
var express = require("express");
var exphbs = require("express-handlebars");
// var passport = require("passport");
// var GoogleStrategy = require('passport-google-oauth20');
//cookies will be enabled later
// var cookieSession = require('cookie-session');
// // cookieSession config
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
//   keys: ['randomstringhere']
// }));

var db = require("./models/");

var app = express();
//process.env is for heroku
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// app.use(passport.initialize()); // Used to initialize passport
// app.use(passport.session()); // Used to persist login sessions

// // Strategy config
// passport.use(new GoogleStrategy( {
//   clientID: keys.oAuthKeys.id,
//   clientSecret: keys.oAuthKeys.secret,
//   callbackURL: keys.oAuthKeys.callbackURL
// },
//     (accessToken, refreshToken, profile, done) => {
//         done(null, profile); // passes the profile data to serializeUser
//     }
// ));

// // Used to stuff a piece of information into a cookie
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// // Used to decode the received cookie and persist session
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // Middleware to check if the user is authenticated
// function isUserAuthenticated(req, res, next) {
//     if (req.user) {
//         next();
//     } else {
//         res.send('You must login!');
//     }
// }

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
