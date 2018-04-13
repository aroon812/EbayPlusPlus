(function () {
  'use strict';

  // Configuring the Items Admin module
  angular
    .module('items.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'me', {
      title: 'Manage My Items',
      state: 'me.items.list'
    });
  }
}());
