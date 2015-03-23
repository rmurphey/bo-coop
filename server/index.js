var five = require('johnny-five');

var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var request = require('request');
var _ = require('lodash');

var WEBPACK_SERVER = 'http://localhost:9001';

var Arduino = require('../arduino');
var sockets = [];
var sensorData = {};
var controlData = {};

var board = new five.Board();
var arduino = Arduino(board);
var sensors = arduino.sensors;
var controls = arduino.controls;

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'jade');

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

app.post('/control/:item/:setting', function (req, res) {
  var control = arduino[req.params.item];
  var setting = req.params.setting;

  if (!control || !control[setting]) {
    return res.status(404).send({ error : 'not found' });
  }

  control[setting]();

  var data = {};
  data[req.params.item] = setting;

  res.status(200).send(data);
});

sensors.on('data', function (data) {
  sensorData = _.extend(sensorData, data);
});

controls.on('data', function (data) {
  controlData = _.extend(controlData, data);
});

emit();

io.on('connection', function (socket) {
  sockets.push(socket);
});

function emit () {
  sockets.forEach(function (s) {
    var data = {
      sensors : sensorData,
      controls : controlData
    };

    s.emit('data', data);
  });

  setTimeout(emit, 1000);
}

server.listen(9000);
console.log('Listening at http://localhost:9000');

