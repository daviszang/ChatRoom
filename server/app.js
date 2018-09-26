var createError = require("http-errors");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var session = require('express-session');

var mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost/mean-angular6",
    { promiseLibrary: require("bluebird") }
  )
  .then(() => console.log("connection successful"))
  .catch(err => console.error(err));

var apiRouter = require("./routes/api");

var app = express();

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

app.use(logger("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(path.join(__dirname, "dist/ChatRoom")));
app.use("/", express.static(path.join(__dirname, "dist/ChatRoom")));
app.use("/api", apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
