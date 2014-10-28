'use strict';

angular.module('whereuatApp')
  .controller('FriendsCtrl', function ($scope, User, Auth) {
    $scope.message = 'Hello';
    $scope.me = function(){
      if(Auth.isLoggedIn())
        return User.get();
    }
  });
