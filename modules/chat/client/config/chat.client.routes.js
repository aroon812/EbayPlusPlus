(function () {
  'use strict';

  angular
    .module('chat.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('friends', {
        url: '/friends',
        templateUrl: '/modules/chat/client/views/friends.client.view.html',
        controller: 'IdController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'me', 'admin']
        }
      })
        .state('chat', {
          url: '/:userId/chat',
          templateUrl: '/modules/chat/client/views/chat.client.view.html',
          controller: 'ChatController',
          controllerAs: 'vm',
          data: {
            roles: ['user', 'me', 'admin']
          }
      })
  };
}());
