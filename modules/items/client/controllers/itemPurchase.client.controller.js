  (function () {
    'use strict';

    angular
      .module('items')
      .controller('ItemsPurchaseController', ItemsPurchaseController);

    ItemsPurchaseController.$inject = ['$scope', '$state', '$window', 'itemResolve', 'Authentication', 'Notification'];

    function ItemsPurchaseController($scope, $state, $window, item, Authentication, Notification) {
      var vm = this;

      vm.item = item;
      vm.authentication = Authentication;
      vm.form = {};
      vm.remove = remove;
      vm.save = save;
      vm.purchase = purchase;

      // Remove existing Article
      function remove() {
        if ($window.confirm('Are you sure you want to delete?')) {
          vm.item.$remove(function () {
            $state.go('items.list');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Item deleted successfully!' });
          });
        }
      }

      // buy an item, currently only removes it
      function purchase() {
        if ($window.confirm('Are you sure you want to purchase this item?')) {
          vm.item.$remove(function () {
            $state.go('items.list');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Item Purchased!' });
          });
        }
      }

      // Save Article
      function save(isValid) {
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.form.itemForm');
          return false;
        }

        // Create a new article, or update the current instance
        vm.item.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);

        function successCallback(res) {
          $state.go('items.list'); // should we send the User to the list or the updated Article's view?
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Item saved successfully!' });
        }

        function errorCallback(res) {
          Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Item save error!' });
        }
      }
    }
  }());
