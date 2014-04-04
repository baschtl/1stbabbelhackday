'use strict';

angular.module('hackdayApp')
  .controller('CardCtrl', function ($scope) {
    $scope.l1_text = $scope.item.l1_text;
    $scope.l2_text = $scope.item.l2_text;
  });
