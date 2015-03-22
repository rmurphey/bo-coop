var five = require('johnny-five');

var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var request = require('request');
var _ = require('lodash');

var Sensors = require('../sensors');
var sockets = [];
var sensorData = {};

var WEBPACK_SERVER = 'http://localhost:9001';

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'jade');

app.use('/static', express.static(__dirname + '../dist'));

app.get('/', function (req, res) {
  res.render('index', {
    config : JSON.stringify(sensorData)
  });
});

// proxy to webpack dev server
app.get('/assets/*', function (req, res) {
  var url = WEBPACK_SERVER + '/assets/' + req.params[0];
  request(url).pipe(res);
});

var board = new five.Board();
var sensors = Sensors(board);

sensors.on('data', function (data) {
  sensorData = _.extend(sensorData, data);
});

emit();

io.on('connection', function (socket) {
  sockets.push(socket);
});

function emit () {
  sockets.forEach(function (s) {
    s.emit('data', sensorData);
  });

  setTimeout(emit, 1000);
}

server.listen(9000);
console.log('Listening at http://localhost:9000');

