(function () {
  'use strict';

  angular
    .module('id')
    .controller('IdController', IdController);

  IdController.$inject = ['$scope', '$state', 'Authentication', 'IdService'];

  function IdController($scope, $state, Authentication, IdService) {
    var vm = this;

// get friends list
    IdService.query(function (data) {
      vm.friends = data;
    });
  }
}());
