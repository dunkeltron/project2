module.exports = function (app, passport) {
    // passport.authenticate middleware is used here to authenticate the request
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile'] // Used to specify the required data
    }));


    // The middleware receives the data from Google and runs the function on Strategy config
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/menu');
    });
    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/menu',
            failureRedirect: '/'
        }));

    // Redirect the user to Twitter for authentication.  When complete, Twitter
    // will redirect the user back to the application at
    //   /auth/twitter/callback
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // Twitter will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/menu',
            failureRedirect: '/'
        }));
}