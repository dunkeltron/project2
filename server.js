// Required dependencies 
require("dotenv").config();
const express = require('express');
const app = express();
const passport = require('passport');
var db = require("./models/");
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;
// cookieSession config
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['randomstringhere']
}));
//middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions


// Handlebars

app.set("view engine", "handlebars");
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);


//routes 
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);
require("./routes/authRoutes")(app,passport);

// google Strategy config
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        //log the user profile so we know the user has the information we need
        //useful for figuring out what data we can access through handlebars parameters
        // check menu.handlebars for an example
        done(null, profile); // passes the profile data to serializeUser
    }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});

//
function createNewUser(user){
    $.ajax({
        method: "POST",
        url: "/api/users/" + user.userId
    });
}

var syncOptions = {
    force: false
};

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
