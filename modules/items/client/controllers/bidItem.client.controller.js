(function () {
    'use strict';
  
    angular
      .module('items')
      .controller('ItemsBidController', ItemsBidController);
  
    ItemsBidController.$inject = ['$scope', 'itemResolve', 'Authentication'];
  
    function ItemsController($scope, item, Authentication) {
      var vm = this;
  
      vm.item = item;
      vm.authentication = Authentication;
  
    }
  }());