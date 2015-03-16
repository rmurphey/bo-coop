var five = require('johnny-five');
var _ = require('lodash');

var board = new five.Board();

board.on('ready', function () {
  var lcd = new five.LCD({
    pins : [ 8, 9, 4, 5, 6, 7 ],
    rows : 2,
    cols : 16,
    backlight : 10
  });

  var BUTTONS = {
    up : 1,
    down : 2,
    left : 3,
    right : 0,
    select : 5,
    none : 7
  };

  var buttons = new five.Sensor({
    pin : 'A0',
    freq : 50
  });

  var lastButton = buttons.value;

  buttons.on('data', function () {
    var val = this.value;
    val = val >> 7;

    if (this.value === 1023) {
      return;
    }

    _.some(BUTTONS, function (mask, btn) {
      if (val === mask) {
        console.log(val, mask, btn);
        return true;
      }
    });
  });

  lcd.print('rmurphey');

  this.repl.inject({
    lcd : lcd,
    buttons : buttons
  });
});