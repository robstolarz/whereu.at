'use strict';

angular.module('whereuatApp')
  .controller('MainCtrl', function ($scope,$window, $location, $timeout) {
    $scope.center = {
      lat: 40.095,
      lng: -3.823,
      zoom: 4
    };
    $scope.markers = {
      osloMarker: {
        lat: 51.50,//59.91,
        lng: -0.082, //10.75,
        message: "I want to travel here!",
        focus: true,
        draggable: false
      }
    };
    $scope.paths = {
      accuracyCircle:{
        weight: 2,
        color: '#0099DD',
        radius: 1,
        type: 'circle',
        latlngs: { lat: 0, lng: 0 }
      }
    }
    
    $timeout(function(){
      $window.navigator.geolocation.watchPosition(function(point){
        console.log(point);
        $scope.paths.accuracyCircle.latlngs = $scope.markers.you = $scope.center = {
          lat:point.coords.latitude,
          lng:point.coords.longitude,
          message: "Your location!",
          zoom: 13 //duck typing
        };
        $scope.paths.accuracyCircle.radius = point.coords.accuracy;
      },function(failureReason){
        window.alert(failureReason.message);
      }/*,{maximumAge:15000}*/);
    });
  });
