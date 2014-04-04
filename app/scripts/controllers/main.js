'use strict';

angular.module('hackdayApp')
  .controller('MainCtrl', function ($scope, $http, contentFactory) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.rawItems = contentFactory.getContent();
    
    $scope.l1Items = _.map($scope.rawItems, function (item) {
      console.log({id: item.id, text: item.l1_text, image_id: item.image_id});
      return {id: item.id, text: item.l1_text, image_id: item.image_id};
    });

    $scope.l2Items = _.map($scope.rawItems, function (item) {
      return {id: item.id, text: item.l2_text, image_id: item.image_id};
    });

    $scope.items = _.shuffle($scope.l1Items.concat($scope.l2Items));
  });
