'use strict';

var io = window.io;
var socket = io.connect('http://localhost:9000');

module.exports = socket;
