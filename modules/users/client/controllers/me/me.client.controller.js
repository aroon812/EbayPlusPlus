(function () {
  'use strict';

  angular
    .module('users.me')
    .controller('MeController', MeController);

  MeController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'Notification'];

  function MeController($scope, $state, $window, Authentication, user, Notification) {
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

      var user = vm.user;
      console.log(user);

      user.$update(function () {
        $state.go('me.user', {
          userId: user._id
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
