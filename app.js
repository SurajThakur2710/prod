// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init({
  env: 'none',
  service: 'products',
  version: '0.0.0',
  runtimeMetrics: true
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var appRoot = require('app-root-path');
var cors = require('cors');

const { createLogger, format, transports } = require('winston');

const winstonLogger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `datadog.log` }),
  ],
});

// Example logs
winstonLogger.log('info', 'Hello simple log!');
winstonLogger.info('Hello log with metas', { color: 'blue' });

var indexRouter = require('./routes/products');
var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
