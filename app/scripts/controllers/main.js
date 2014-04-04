'use strict';

angular.module('hackdayApp')
.controller('MainCtrl', function ($scope, $http, contentFactory) {
  var collection = contentFactory.getContent();
  $scope.collection = collection;
  $scope.opponentScore = 0;

  var peer = new Peer({key: 'jibe3z01j1fnipb9'});

  peer.on('open', function (id) {
    $scope.$apply(function () {
      $scope.peerId = id;
    });
  });

  $scope.createGame = function () {
    peer.on('connection', function (conn) {
      console.log("Opponent is connected!");
      collection.sendData = function (data) {
        conn.send(data);
      };
      conn.on('data', syncData);
    });
    $scope.connected = true;
  };


  $scope.connect = function () {
    var peerId = $scope.targetPeerId;
    var conn = peer.connect(peerId);
    conn.on('open', function () {
      collection.sendData = function (data) {
        conn.send(data);
      };
    });
    $scope.connected = true;
    conn.on('data', syncData);

  };

  var syncData = function (data) {
    var parsedData = JSON.parse(data);
    console.log(parsedData);
    switch (parsedData.messageType) {
      case 'sync':
        collection.syncItems(parsedData);
        break;
      case 'score':
        $scope.opponentScore = parsedData.score;
        console.log($scope.opponentScore);
        break;
    }
    $scope.$apply(function () { });
  };

  var writeMessage = function (message) {
    $scope.$apply(function () {
      $scope.message = message;
    });
  };
});
