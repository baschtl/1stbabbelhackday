'use strict';

angular.module('hackdayApp')
  .controller('MainCtrl', function ($scope, $http, contentFactory) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.items = contentFactory.getContent();
  });
