'use strict';

angular.module('hackdayApp')
.controller('PeerConnectionCtrl', function ($scope) {

  var peer = new Peer({key: 'jibe3z01j1fnipb9'});

  $scope.liveString = '';

  peer.on('open', function (id) {
    $scope.$apply(function () {
      $scope.peerId = id;
    });
  });

  $scope.createGame = function () {
    peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        $scope.$apply(function () {
          $scope.liveString += data;
        });
      });
    });
    console.log('listening for connection');
  };


  $scope.connect = function () {
    var peerId = $scope.targetPeerId;
    var conn = peer.connect(peerId);
    conn.on('open', function () {
      conn.send('hi!');
    });
  };
});
