(function () {
  'use strict';

  angular
    .module('item')
    .controller('ItemsListController', ItemsListController);

  ItemsListController.$inject = ['ItemsService'];

  function ItemsListController(ItemsService) {
    var vm = this;

    vm.items = ItemsService.query();
  }
}());
