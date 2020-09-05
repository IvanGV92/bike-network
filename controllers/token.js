const User = require('../models/user');
const Token = require('../models/token');

module.exports = {
    confirmationGet: function(req,res,next){
        Token.findOne({ token: req.params.token }, function(err, token){
            if(!token) return res.status(400).send({ type: 'not-verified', msg: 'We did not find an user with this token.'});
            User.findById(token._userId, function(err, user){
                if(!user) return res.status(400).send({ mmsg: 'We did not find a user wih this token'});
                if(user.verified) return res.redirect('/users');
                user.verified = true;
                user.save(function(err){
                    if(err){ return res.status(500).send({ msg: err.message });}
                    res.redirect('/');
                });
            });
        });
    }
}