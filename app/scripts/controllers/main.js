'use strict';

angular.module('hackdayApp')
  .controller('MainCtrl', function ($scope, $http, contentFactory) {
    $scope.items = contentFactory.getContent();
  });
