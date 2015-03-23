'use strict';

var React = require('react');

// CSS
require('../../styles/main.css');

var Sensor = require('./Sensor');
var Control = require('./Control');

var BoCoopApp = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Sensors</h2>
        <table className="table table-striped">
          <thead>
            <th>Temperature</th>
            <th>Light</th>
            <th>Water</th>
            <th>Food</th>
          </thead>
          <tbody>
            <td><Sensor name="temperature" unit="ºF" /></td>
            <td><Sensor name="light" /></td>
            <td><Sensor name="water" unit="in" /></td>
            <td><Sensor name="food" unit="in" /></td>
          </tbody>
        </table>

        <h2>Controls</h2>

        <Control name="light" />

      </div>
    );
  }
});

React.render(<BoCoopApp />, document.getElementById('content')); // jshint ignore:line

module.exports = BoCoopApp;
