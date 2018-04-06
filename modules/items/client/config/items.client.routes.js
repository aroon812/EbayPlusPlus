(function () {
  'use strict';

  angular
    .module('items.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('items', {
        abstract: true,
        url: '/items',
        template: '<ui-view/>'
      })
      .state('items.list', {
        url: '',
        templateUrl: '/modules/items/client/views/list-items.client.view.html',
        controller: 'ItemsListController',
        controllerAs: 'vm'
      })
      .state('items.view', {
        url: '/:itemId',
        templateUrl: '/modules/items/client/views/view-item.client.view.html',
        controller: 'ItemsController',
        controllerAs: 'vm',
        resolve: {
          itemResolve: getItem
        },
        data: {
          pageTitle: '{{ itemResolve.itemName }}'
        }
      })
      .state('items.bid', {
        url: '/:itemId/bid',
        templateUrl: '/modules/items/client/views/bid-view.html',
        controller: 'ItemsBidController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ itemResolve.itemName }}'
        },
        resolve: {
          itemResolve: getItem
        }
      });
  }
  
  getItem.$inject = ['$stateParams', 'ItemsService'];

  function getItem($stateParams, ItemsService) {
    return ItemsService.get({
      itemId: $stateParams.itemId
    }).$promise;
  }
}());
