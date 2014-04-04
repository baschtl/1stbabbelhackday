'use strict';

angular.module('hackdayApp')
  .controller('CardCtrl', function ($scope) {
    var card = $scope.card;
    $scope.text = card.text;
  });
