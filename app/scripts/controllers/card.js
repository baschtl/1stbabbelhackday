'use strict';

angular.module('hackdayApp')
  .controller('CardCtrl', function ($scope) {
    var item = $scope.item;
    $scope.text = item.text;
    $scope.frontUpCard = item.frontUp;
    $scope.cardClick = function () {
      item.onClick();
      $scope.frontUpCard = item.frontUp;
    }
  });
