'use strict';

angular.module('whereuatApp')
  .factory('At', function ($resource) {
    return $resource('/api/ats/:id/:controller', {
      id: '@_id'
    });
  });