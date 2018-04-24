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
      Socket.emit('chatMessage', message);

      vm.newMessage = function () {
        var newMessage = new MessageService({
          message: vm.messageText,
          corresponder: window.location.pathname.split('/')[1]
        });
  
        newMessage.$save(function (data) {
          newMessage._id = data._id;
        });
      };

        // Clear the message text
      vm.messageText = '';
    }
  }
}());
