require('dotenv').config();						   
					
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Token = require('./models/token');
							

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bikesRouter = require('./routes/bikes');
const bikesAPIRouter = require('./routes/api/bikes');
const usersAPIRouter = require('./routes/api/users');
const tokenRouter = require('./routes/token');
const authAPIRouter = require('./routes/api/auth');

let store;
if(process.env.NODE_ENV === 'development'){
  store = new session.MemoryStore;
}else{
  store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  });
  store.on('error',function(error){
    assert.ifError(error);
    assert.ok(false);
  })
}

 

let app = express();

app.set('secretKey','jwt_psss_11872652khasdh?');
app.use(session({
  cookie: { maxAge: 240 *60 *60 *1000},
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: `bike_networl1234567654%^&*()`
}));

const mongoose = require('mongoose');
const { assert } = require('console');


const mongoDB =process.env.MONGO_URI;
mongoose.set('useNewUrlParser', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());							   
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login',function(req,res){
  res.render('session/login');
});

app.post('/login', function(req,res,next){
  passport.authenticate('local', function(err, user, info){
    if(err) return next(err);
    if(!user) return res.render('session/login', {info});
    req.login(user, function(err){
      if(err) return next(err);
      return res.redirect('/');
    });

  })(req, res, next);
});

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

app.get('/forgotPassword', function(req,res){
  res.render('session/forgotPassword');
});

app.post('/forgotPassword', function(req,res){
  User.findOne({ email: req.body.email}, function(err, user){
    if(!user) return res.render('session/forgotPassword', { info: {message: 'There is not an email linked to the existent user.'}});
    user.resetPassword(function(err){
      if(err) return next(err);
      console.log('session/forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage');

  });
});


  
app.get('/resetPassword/:token', function(req,res,next){
  Token.findOne({ token: req.params.token}, function(err, token){
    if(!token) return res.status(400).send( {type: 'not-verified', msg: 'There is not an token linked to the existent user. Plase verify that your token has not expired.'});
    
    User.findById(token._userId, function(err, user){
      if(!user) return res.status(400).send( {msg: 'There is not a token associated to the user.'});
      res.render('session/resetPassword',{ errors: {}, user: user});
    });


  });
});

app.post('/resetPassword', function(req,res){
  if(req.body.password != req.body.confirm_password){
    res.render('session/resetPassword', { errors: {confirm_password: {message: 'There is not a match between the password and the entered user'}},
    user: new User({email: req.body.email})});
    return;
  }
  User.findOne({ email: req.body.email }, function(err, user){
    user.password = req.body.password;
    user.save(function(err){
      if(err){
        res.render('session/resetPassword',{errors: err.errors, user: new User({email: req.body.email})});
      }else{
        res.redirect('/login');
      }});
  });

  
  });		   
		   
		

app.use('/', indexRouter);
app.use('/users',loggedIn, usersRouter);
app.use('/bikes',loggedIn, bikesRouter);
									

app.use('/api/auth',authAPIRouter);
app.use('/api/bikes',validateUser,bikesAPIRouter);
app.use('/api/users',usersAPIRouter);
app.use('/token',tokenRouter);

app.use('/privacy_policy',function(req, res){
  res.sendFile('publics/privacy_policy.html');
});


app.use('/googlee77bb0fca0989f05.html',function(req, res){
  res.sendFile('publics/googlee77bb0fca0989f05.html');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read',
    'profile', 'email' ] }
));

app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/error'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



function loggedIn(req,res,next){
  if(req.user){
    next();
  }else{
    console.log('User not logged in');
    res.redirect('login');
  }
};
								  
function validateUser(req,res,next){
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'),function(err, decoded){
    if(err){
      res.json({status:"error", message: err.message, data:null});
    }else{
      req.body.userId = decoded.id;
      console.log('jwt verify: '+ decoded);
      next();
    }
  });
}										 
						   
   
  

										
																							 
			
																	
		  
								   
											
			 
	 
	 
 

module.exports = app;
