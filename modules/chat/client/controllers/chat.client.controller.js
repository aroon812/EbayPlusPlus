(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', 'Authentication', 'Socket', 'IdService', 'MessageService'];

  function ChatController($scope, $state, Authentication, Socket, IdService, MessageService) {
    var vm = this;

    // vm.messages = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;
    vm.messages = [];

    // This needs to be moved into a aplace where i can still use vm.messages,
    // or vm.messages is not the right place to store this data

    MessageService.query(function (data) {
      IdService.query(function (dat) {
        vm.users = dat;
        var fullList = vm.users;
        var n = vm.users.length;
        var me = [];
        for (var i = 0; i < n; i++) {
          if (fullList[i].username === user.username) {
            me.push(fullList[i]);
          }
        }
        vm.me = me[0]._id;
        var n = data.length;
        for (var i = 0; i < n; i++) {
          var x = data[i].corresponder === window.location.pathname.split('/')[1];
          var y = data[i].user._id === vm.me;
          var z = data[i].corresponder === vm.me;
          var w = data[i].user._id === window.location.pathname.split('/')[1];
          if (x && y || z && w) {
            var mes = {
              username: data[i].user.displayName,
              text: data[i].message,
              profileImageURL: data[i].profileImageURL
              // '/modules/users/client/img/profile/uploads/2037f61058318a35e4b19414a7f387e7'
            };
            vm.messages.unshift(mes);

          }
        }
      });
    });

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('chatMessage');
      });
    }
      // Create a controller method for sending messages
    function sendMessage() {
        // Create a new message object
      var message = {
        text: vm.messageText
      };

        // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      var newMessage = new MessageService({
        message: vm.messageText,
        corresponder: window.location.pathname.split('/')[1],
        profileImageURL: Authentication.user.profileImageURL
      });
      newMessage.$save(function (cid) {
        newMessage._id = cid._id;
      });
        // Clear the message text
      vm.messageText = '';
    }
  }
}());
