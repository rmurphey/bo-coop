'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var BoCoopApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    BoCoopApp = require('components/BoCoopApp.js');
    component = React.createElement(BoCoopApp);
  });

  it('should create a new instance of BoCoopApp', function () {
    expect(component).toBeDefined();
  });
});
