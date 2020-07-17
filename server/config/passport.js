var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[nickname]',
  passwordField: 'user[password]'
}, function(nickname, password, done) {
  User.findOne({nickname: nickname}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'nickname or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

