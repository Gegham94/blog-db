const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser     = require('body-parser');

const indexRouter = require('./routes/index');
const recipeRouter = require('./routes/recipe');
const logRegRouter = require('./routes/logReg');
const ejsMate = require('ejs-mate');
const conf = require('./config');

const app = express();

// view engine setup
app.engine(conf.get('views:engine'),ejsMate);
app.set('views', path.join(__dirname, conf.get('views:dir')));
app.set('view engine', conf.get('views:engine'));

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/recipes', recipeRouter);
app.use('/auth', logRegRouter);

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

module.exports = app;
