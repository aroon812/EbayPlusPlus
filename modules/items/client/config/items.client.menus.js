(function () {
  'use strict';

  angular
    .module('items')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Items',
      state: 'items.list'
    });
  }
}());
