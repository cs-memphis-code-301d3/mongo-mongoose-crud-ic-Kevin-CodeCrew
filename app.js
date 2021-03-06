var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// ref mongoose for mongodb
let mongoose = require('mongoose');
let mongoDb = "mongodb+srv://kyancy:C0d3Cr3w@cluster0.xuvdi.mongodb.net/code301?retryWrites=true&w=majority";
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
// check if we got a valid db connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//////////////////////////////////////
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
let entryRouter = require('./routes/entry'); // Add our entry route(s)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mount root point for our web service
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/entry',entryRouter);

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
// mongodb+srv://kyancy:<password>@cluster0.xuvdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority