'use strict';

var React = require('react/addons');
var socket = require('../socket');
var Sparkline = require('react-sparkline');
var _ = require('lodash');

var Sensor = React.createClass({
  getInitialState: function () {
    return {
      value : window._initialData[this.props.name],
      history : []
    };
  },

  componentDidMount : function () {
    socket.on('data', function (data) {
      data = data.sensors;
      var newValue = data[this.props.name];

      this.setState({
        value : newValue,
        history : this.state.history.concat([newValue])
      });
    }.bind(this));
  },

  getDefaultProps: function () {
    return {
      unit: ''
    };
  },

  render: function () {
    var value = this.state.value;
    value = value ? Math.round(value) : '';

    var values = this.state.history ? this.state.history.slice(-20) : [];

    return(
      <div className="sensor">
        <div>{value}{this.props.unit}</div>
        <Sparkline data={values} />
      </div>
    );
  }
});

module.exports = Sensor;
