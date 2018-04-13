(function () {
  'use strict';

  angular
    .module('users.me')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module 
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'me', {
      title: 'Manage Me',
      state: 'me.users'
    });
  }
}());
