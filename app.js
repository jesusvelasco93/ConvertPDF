const express = require('express');
const app = express();

const pdfConverter = require('./routes/pdf');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));

console.log("Call http://localhost:3000");
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
