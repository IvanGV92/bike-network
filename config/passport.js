const passport =  require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

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

passport.serializeUser(function(user, callback){
    callback(null,user.id);
});

passport.deserializeUser(function(id, callback){
    User.findById(id, function(err, user){
        callback(err, user);
    });
});

module.exports = passport;