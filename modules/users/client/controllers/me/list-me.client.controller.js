(function () {
  'use strict';

  angular
    .module('users.me')
    .controller('MeListController', MeListController);

  MeListController.$inject = ['$scope', '$filter', 'IdService'];

  function MeListController($scope, $filter, IdService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    IdService.query(function (data) {
      vm.users = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      var fullList = vm.users;
      var n = vm.users.length;
      var me = [];
      for (var i = 0; i < n; i++) {
        if (fullList[i].username === user.username) {
          me.push(fullList[i]);
        }
      }
      vm.filteredItems = me;
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
