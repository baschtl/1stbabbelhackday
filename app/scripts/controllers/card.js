'use strict';

angular.module('hackdayApp')
  .controller('CardCtrl', function ($scope) {
    $scope.text = $scope.item.text;
    $scope.frontUp = false;
    $scope.cardClick = function () {
      $scope.frontUp = !$scope.frontUp;
    }
  });
