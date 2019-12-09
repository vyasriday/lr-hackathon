var LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');
const fetch = require("node-fetch");

module.exports = function (passport) {
  var instance = axios.create({
    baseURL: 'https://api.loginradius.io/v1/',
    timeout: 1000,
  });
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, email, password, done) {
      process.nextTick(function () {
        fetch('https://api.loginradius.io/v1/register/', {
          email: email,
          password: password
        })
          .then((response) => {
            return done(null, { "message": "user registered" });
          }, (error) => {
            console.log(error);
            // return done(null, error);
          });
      });
    }));

    passport.use('Login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, email, password, done) {
      process.nextTick(function () {
        fetch('https://api.loginradius.io/v1/login/', {
          method: 'POST',
          data: {
            email: email,
            password: password
          }
          
        })
          .then((response) => {
            return done(null, { "message": "user logged in " });
          }, (error) => {
            console.log(error);
            // return done(null, error);
          });
      });
    }));

}
