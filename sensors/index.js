var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var five = require('johnny-five');

module.exports = function (board) {
  var sensors = new EventEmitter();

  board.on('ready', function () {
    var led = new five.Led.RGB({
      pins : {
        red : 9,
        green : 10,
        blue : 11
      }
    });

    var temp = sensors.temp = new five.Temperature({
      controller : 'TMP36',
      pin : 'A1'
    });

    var ping = sensors.ping = new five.Sensor({
      pin : 'A3',
      freq : 250
    });

    var light = sensors.light = new five.Sensor({
      pin : 'A2',
      freq : 250
    });

    // var relay = sensors.relay = new five.Relay(2);

    temp.on('change', function (err, data) {
      sensors.emit('data', { temperature : data.celsius });
    });

    ping.on('data', function () {
      sensors.emit('data', { food : this.value });
    });

    light.on('data', function () {
      sensors.emit('data', { light : this.value });
    });
  });

  return sensors;
};
