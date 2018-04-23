(function () {
  'use strict';

  angular
  .module('core.me.services')
  .factory('IdService', IdService);

  IdService.$inject = ['$resource'];

  function IdService($resource) {
    return $resource('/api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
