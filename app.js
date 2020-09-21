const express = require('express');
const cookieParser = require('cookie-parser');

const pdfConverter = require('./routes/pdf');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

app.use('/', pdfConverter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).end();
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).end();
});

module.exports = app;
