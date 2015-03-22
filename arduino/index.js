var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var five = require('johnny-five');

module.exports = function (board) {
  var sensors = new EventEmitter();
  var light = {
    initialized : false,
    on : function () {},
    off : function () {}
  };

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

    var photoSensor = sensors.light = new five.Sensor({
      pin : 'A2',
      freq : 250
    });

    var relay = new five.Relay(2);

    light.on = relay.on.bind(relay);
    light.off = relay.off.bind(relay);
    light.initialized = true;

    // ensure we always start with the light off
    relay.off();

    temp.on('change', function (err, data) {
      sensors.emit('data', { temperature : data.celsius });
    });

    ping.on('data', function () {
      sensors.emit('data', { food : this.value });
    });

    photoSensor.on('data', function () {
      sensors.emit('data', { light : this.value });
    });
  });

  return {
    sensors : sensors,
    light : light
  };
};
