'use strict';

angular.module('whereuatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.at', {
        url: '/a',
        templateUrl: 'app/main/at/at.html',
        controller: 'AtCtrl'
      });
  });