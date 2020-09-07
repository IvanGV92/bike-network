const mongoose = require('mongoose');
const Reservation = require('./reservation');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const mailer = require('../mailer/mailer'); 
const Token = require('./token');

const saltRounds = 10;
const Schema = mongoose.Schema;

const validateEmail = (email)=>{
    const regex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

let userSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: [true,"The name is mandatory"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "The email is mandatory"],
        lowercase: true,
        validate: [validateEmail, "Please type a valid email"],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password: {
        type: String,
        required: [true, "The password is mandatory"],
    },
    passwordResetToken:  String,
    passwordResetTokenExpires: Date,
    verified: {
        type: Boolean,
        default: false
    },
    googleId: String
});

userSchema.plugin(uniqueValidator, {message: 'The {PATH} already exists with another user.'});

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.reserve = function(bikeId, from, to, callback){
    let reservation = new Reservation({ user: this._id, bike: bikeId, from: from, to: to });
    console.log(reservation);
    reservation.save(callback);
}

userSchema.methods.send_email_welcome = function(callback){
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err){
        if(err) {return console.log(err.message);}
        const mailOptions = {
            from: 'no-reply@bikenetwork.com',
            to: email_destination,
            subject: 'Account verification',
            text: 'Hello, \n\n In order to verify your account please click on the following link: \n http://localhost:3000'+'\/token\/confirmation\/'+token.token+'.\n'
        };
        
        mailer.sendMail(mailOptions, function(err){
            if(err) { return  console.log(err.message);}
            console.log(`A verification email has been sent to ${email_destination}.`);    
    });            
    
    });
};

userSchema.methods.resetPassword = function(callback){
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err){
        if(err) {return callback(err);}
        const mailOptions = {
            from: 'no-reply@bikenetwork.com',
            to: email_destination,
            subject: 'Password account reset',
            text: 'Hello, \n\n In order to reset your passwords account please click on the following link: \n http://localhost:3000'+'\/resetPassword\/'+token.token+'.\n'};
    mailer.sendMail(mailOptions, function(err){
        if(err) { return callback(err);}
        console.log(`An email to reset the password has been sent to ${email_destination}.`);    
    });            
    callback(null);
    });
};

userSchema.statics.findOrCreateByGoogle = function findOneOrCreate(condition, callback){
    const self = this;
    console.log(condition);
    self.findOne({
        $or:[
            { googleId: condition.id},{ email: condition.emails[0].value}
        ]}, (err, result)=>{
            if(result){
                callback(err,result);
            } else{
                console.log('--------------------CONDITION----------------');
                let values = {};
                console.log(condition);
                values.googleId = condition.id;
                values.email = condition.emails[0].value;
                values.name = condition.displayName || 'NAMELESS';
                values.verified = true;
                values.password = crypto.randomBytes(16).toString('hex');
                console.log('------------------VALUES----------------');
                console.log(values);
                self.create(values, (err, result)=>{
                    if(err) { console.log(err);}
                    return callback(err, result);
                });
            }
        });
}

module.exports = mongoose.model("User",userSchema);