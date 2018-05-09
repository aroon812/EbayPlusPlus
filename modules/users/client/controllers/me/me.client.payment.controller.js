(function () {
  'use strict';

  angular
    .module('users.me')
    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'Notification'];

  function PaymentController($scope, $state, $window, Authentication, user, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    vm.remove = remove;
    vm.update = update;
    vm.isContextUserSelf = isContextUserSelf;

    // Update this to work as a self deletion mechanism
    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
          Notification.success('Account deleted successfully!');
        } else {
          vm.user.$remove(function () {
            $state.go('me.user');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
        return false;
      }

      var u = vm.user;
      console.log(u.card);

      u.$update(function () {
        $state.go('items.list', {
          userId: u._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Updated successfully!' });
      }, function (errorResponse) {
        Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
      });
    }

    function isContextUserSelf() {
      return vm.user.username === vm.authentication.user.username;
    }
  }
}());