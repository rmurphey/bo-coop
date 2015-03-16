var _ = require('lodash');
var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function () {
  var led = new five.Led.RGB({
    pins : {
      red : 9,
      green : 10,
      blue : 11
    }
  });

  var temp = new five.Temperature({
    controller : 'TMP36',
    pin : 'A1'
  });

  var ping = new five.Sensor({
    pin : 'A3',
    freq : 250
  });

  var relay = new five.Relay(2);

  temp.on('data', _.throttle(function (err, d) {
    // consolrele.log(d.fahrenheit);
  }, 1000));

  ping.on('data', function () {
    console.log(this.value);
  });


  this.repl.inject({
    led : led,
    temp : temp,
    ping : ping,
    relay : relay
  });
});