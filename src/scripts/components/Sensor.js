'use strict';

var React = require('react/addons');
var socket = require('../socket');

var Sensor = React.createClass({
  getInitialState: function () {
    var name = this.props.name;

    return {
      value: window._initialData
    };
  },

  componentDidMount : function () {
    socket.on('data', function (data) {
      this.setState(data);
    }.bind(this));
  },

  getDefaultProps: function () {
    return {
      unit: ''
    };
  },

  render: function () {
    var value = this.state[this.props.name];
    value = value ? Math.round(value) : 'unk';

    return(
      <div className="sensor">
        <dl>
          <dt>{this.props.name}</dt>
          <dd>{value}{this.props.unit}</dd>
        </dl>
      </div>
    );
  }
});

module.exports = Sensor;
