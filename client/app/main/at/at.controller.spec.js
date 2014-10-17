'use strict';

describe('Controller: AtCtrl', function () {

  // load the controller's module
  beforeEach(module('whereuatApp'));

  var AtCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AtCtrl = $controller('AtCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
