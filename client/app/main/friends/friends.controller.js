'use strict';

angular.module('whereuatApp')
  .controller('FriendsCtrl', function ($scope, User, Auth, At) {
    $scope.message = 'Hello';
    $scope.me = {
      
    };
    console.log("yo");
    $scope.ats = At.query();
    console.log($scope.ats);
    if(Auth.isLoggedIn()){
      $scope.me = User.get();
      console.log("yo");
    }
  });
