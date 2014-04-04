'use strict';

describe('Service: contentFactory', function () {

  // load the service's module
  beforeEach(module('hackdayApp'));

  // instantiate service
  var contentFactory;
  beforeEach(inject(function (_contentFactory_) {
    contentFactory = _contentFactory_;
  }));

  it('should do something', function () {
    expect(!!contentFactory).toBe(true);
  });

});
