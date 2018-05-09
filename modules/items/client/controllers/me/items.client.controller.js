(function () {
  'use strict';

  angular
    .module('items.me')
    .controller('ItemsMeController', ItemsMeController);

  ItemsMeController.$inject = ['$scope', '$state', '$window', 'itemResolve', 'Authentication', 'Notification', 'Upload'];

  function ItemsMeController($scope, $state, $window, item, Authentication, Notification, Upload) {
    var vm = this;

    vm.item = item;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.item.$remove(function () {
          $state.go('me.items.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Item deleted successfully!' });
        });
      }
    }

    $scope.goToPic = function() {
      console.log(vm.item._id);
      $state.go('me.items.addPicture', {
        itemId: vm.item._id
      });
    }

    // Save Article
    function save(isValid) {
      console.log("where am I");
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.itemForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.item.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
         // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Item saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Item save error!' });
      }
    }
  }
}());
