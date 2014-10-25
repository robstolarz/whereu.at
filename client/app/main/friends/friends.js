'use strict';

angular.module('whereuatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.friends', {
        url: 'friends',
        templateUrl: 'app/main/friends/friends.html',
        controller: 'FriendsCtrl'
      });
  });