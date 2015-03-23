var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var five = require('johnny-five');

module.exports = function (board) {
  var sensors = new EventEmitter();
  var controls = new EventEmitter();

  var light = {
    initialized : false
  };

  var heat = {
    initialized : false
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
      freq : 100
    });

    var photoSensor = sensors.light = new five.Sensor({
      pin : 'A2',
      freq : 100
    });

    var lightSwitch = new five.Relay(2);

    light.on = lightSwitch.on.bind(lightSwitch);
    light.off = lightSwitch.off.bind(lightSwitch);
    light.initialized = true;

    // ensure we always start with the light off
    lightSwitch.off();

    var heatSwitch = new five.Relay(4);

    heat.on = heatSwitch.on.bind(heatSwitch);
    heat.off = heatSwitch.off.bind(heatSwitch);
    heat.initialized = true;

    temp.on('change', function (err, data) {
      sensors.emit('data', { temperature : data.fahrenheit });
    });

    ping.on('data', function () {
      sensors.emit('data', { food : this.value });
    });

    photoSensor.on('data', function () {
      sensors.emit('data', { light : this.value });
    });

    function report () {
      controls.emit('data', {
        light : lightSwitch.isOn,
        heat : heatSwitch.isOn
      });

      setTimeout(report, 1000);
    }

    report();
  });

  return {
    sensors : sensors,
    light : light,
    heat : heat,
    controls : controls
  };
};
