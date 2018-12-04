module.exports = function (app, passport) {
    // passport.authenticate middleware is used here to authenticate the request
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile'] // Used to specify the required data
    }));


    // The middleware receives the data from Google and runs the function on Strategy config
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/menu');
    });
}