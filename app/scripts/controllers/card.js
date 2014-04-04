'use strict';

angular.module('hackdayApp')
  .controller('CardCtrl', function ($scope) {
    var item = $scope.item;
    $scope.text = item.text;
    $scope.cardClick = item.onClick;
  });
