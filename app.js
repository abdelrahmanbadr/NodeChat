var express = require('express')
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var messages = require('./routes/messages');
var  http = require('http').Server(app);
var io = require('socket.io')(http);
var socket = require('./chat')(io, http);
var port = process.env.PORT || 3000;






app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');
  next();
 });
 app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/messages', messages);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

http.listen(port, () => {
  console.log('Listening on port ' + port);
});



module.exports = app;