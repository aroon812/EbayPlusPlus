﻿(function () {
  'use strict';

  angular
    .module('items.me.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('me.items', {
        abstract: true,
        url: '/items',
        template: '<ui-view/>',
      })
      .state('me.items.list', {
        url: '',
        templateUrl: '/modules/items/client/views/me/list-items.client.view.html',
        controller: 'ItemsMeListController',
        controllerAs: 'vm',
        data: {
          roles: ['me']
        }
      })
      .state('me.items.edit', {
        url: '/:itemId/edit',
        templateUrl: '/modules/items/client/views/me/form-item.client.view.html',
        controller: 'ItemsMeController',
        controllerAs: 'vm',
        data: {
          roles: ['me'],
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

  newItem.$inject = ['ItemsService'];

  function newItem(ItemsService) {
    return new ItemsService();
  }

  getId.$inject = ['$stateParams', 'IdService'];

  function getId($stateParams, IdService) {
    return IdService.get({
      userId: $stateParams.userId
    }).$promise;
  }
}());
