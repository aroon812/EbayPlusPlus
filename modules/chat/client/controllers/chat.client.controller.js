(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', 'Authentication', 'Socket', 'IdService', 'MessageService'];

  function ChatController($scope, $state, Authentication, Socket, IdService, MessageService) {
    var vm = this;

    vm.messageText = '';
    vm.theMessages = [];
    vm.sendMessage = sendMessage;
    vm.olds =  MessageService.query();
    console.log(vm.olds);
    

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
<<<<<<< HEAD
        Socket.emit('chatMessage', message);

        var lastMessage = new MessageService({
          message: vm.messageText,
          corresponder: window.location.pathname.split('/')[1]
        });
        
        console.log(lastMessage);

        lastMessage.$save(function (data) {
          lastMessage._id = data._id;
          vm.messages.push(lastMessage);
        });

        // Clear the message text
        vm.messageText = '';
=======
      Socket.emit('chatMessage', message);

      vm.message = {
        message: message,
        corresponder: window.location.pathname.split('/')[1]
      };

      save(vm.message);

      function save(isValid) {
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.message');
          return false;
        }
        console.log('where am i getting');
        console.log('How do i add vm.message to the database');
>>>>>>> 87749bbe693c0b42a302006a24e74615056ffffc
      }

      console.log(vm.theMessages);

        // Clear the message text
      vm.messageText = '';
    }
  }
}());
