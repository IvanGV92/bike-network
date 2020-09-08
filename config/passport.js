const passport =  require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err)  return done(err);
            if(!user) return done(null, false, { message: 'Incorrect email.'});
            if(!user.validPassword(password)) return done(null, false, {message: 'Incorrect Password.'});

            return done(null, user);
        });
    }
));

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.HOST+"/auth/google/callback"
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreateByGoogle(profile, function (err, user) {
      return callback(err, user);
    });
  }
));

passport.serializeUser(function(user, callback){
    callback(null,user.id);
});

passport.deserializeUser(function(id, callback){
    User.findById(id, function(err, user){
        callback(err, user);
    });
});

module.exports = passport;