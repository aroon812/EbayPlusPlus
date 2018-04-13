(function () {
  'use strict';

  angular
    .module('core.me')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Me',
      state: 'me',
      type: 'dropdown',
      roles: ['me']
    });
  }
}());
