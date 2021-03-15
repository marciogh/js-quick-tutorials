const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const connectEnsureLogin = require('connect-ensure-login')
const db = require('./db');

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const app = express();
app.use(express.static('static'))
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// auth endpoints

app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/error.html' }),
    function(req, res) {
        res.redirect('/');
    }
);
  
app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    }
);

// restricted endpoints. If not logged in, will redirect to login.html

app.get("/", function(req, res) {
    connectEnsureLogin.ensureLoggedIn('/login.html'),
    res.redirect("/profile")
})

app.get('/profile',
    connectEnsureLogin.ensureLoggedIn('/login.html'),
    function(req, res){
        res.json(req.user)
    }
);

app.listen(3000);