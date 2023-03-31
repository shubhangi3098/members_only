const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// configure dotenv
require('dotenv').config();

const { strategy, serializeFn, deserializeFn } = require('./auth');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');

// Set up mongoose connection
const mongoDB_URI = process.env.MONGODB_URI;
mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setup LocalStrategy
passport.use(strategy);
passport.serializeUser(serializeFn);
passport.deserializeUser(deserializeFn);

const app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'hello', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
// Expost user to all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
// app.use('/join', joinRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
