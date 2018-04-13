(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.me.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('me.users', {
        url: '/users',
        templateUrl: '/modules/users/client/views/me/list-me.client.view.html',
        controller: 'MeListController',
        controllerAs: 'vm'
      })
      .state('me.user', {
        url: '/users/:userId',
        templateUrl: '/modules/users/client/views/me/view-me.client.view.html',
        controller: 'MeController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: '{{ userResolve.displayName }}'
        }
      })
      .state('me.user-edit', {
        url: 'users/:userId/edit',
        templateUrl: '/modules/users/client/views/me/edit-me.client.view.html',
        controller: 'MeController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: '{{ userResolve.displayName }}'
        }
      });

    getUser.$inject = ['$stateParams', 'IdService'];

    function getUser($stateParams, IdService) {
      return IdService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
