var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerRouter = require('./swagger');

var indexRouter = require('./routes/index');
const app = express();
/* Routes */
const router1 = require('./routes/v1/routes')
const router2 = require('./routes/v2/routes2')
const router3 = require('./routes/v3/routes')
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(swaggerRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
/* route */
app.use('/v1', router1)
app.use('/v2', router2)
app.use('/v3', router3)
app.use(function (req, res, next) {
  // console.log(err)
  next();
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

console.log("Server is running!\n\nAPI documentation: http://localhost:3000/api-docs")

module.exports = app;
