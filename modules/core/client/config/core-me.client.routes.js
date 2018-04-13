(function () {
  'use strict';

  angular
    .module('core.me.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('me', {
        abstract: true,
        url: '/me',
        template: '<ui-view/>',
        data: {
          roles: ['me']
        }
      });
  }
}());
