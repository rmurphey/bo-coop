'use strict';

var React = require('react');

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var Sensor = require('./Sensor');
var Control = require('./Control');

var BoCoopApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <h1>BoCoop</h1>

        <ul>
          <li><Sensor name="temperature" unit="ºF" /></li>
          <li><Sensor name="light" /></li>
          <li><Sensor name="water" unit="in" /></li>
          <li><Sensor name="food" unit="in" /></li>
        </ul>

        <h2>Controls</h2>

        <ul>
          <li><Control name="light" /></li>
        </ul>

      </div>
    );
  }
});

React.render(<BoCoopApp />, document.getElementById('content')); // jshint ignore:line

module.exports = BoCoopApp;
