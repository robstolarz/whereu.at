'use strict';

angular.module('whereuatApp')
  .controller('MainCtrl', function ($scope, $http, $window) {
    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 16
    };
    $scope.marker = {idKey:'1'};
    $window.navigator.geolocation.getCurrentPosition(function(point){
      console.log(point);
      $scope.map.center = point.coords;
    },function(failureReason){
      window.alert(failureReason);
    });
  });
