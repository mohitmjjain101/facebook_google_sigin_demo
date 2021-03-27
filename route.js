const passport = require('passport');
const express = require('express');
var router = express.Router();


const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.get('/', function (req, res) {
    res.render('pages/index.ejs'); // load the index.ejs file
});


router.get('/success', isLoggedIn, function (req, res) {
    res.render('pages/success.ejs', {

        user: req.user
    });
});

router.get('/error', isLoggedIn, function (req, res) {
    res.render('pages/error.ejs', {

        user: req.user
    });
});


router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/error'
    })
);

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/error'
    })
);


router.get('/error', isLoggedIn, function (req, res) {
    res.render('pages/error.ejs');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;