(function () {
  'use strict';

  angular
    .module('items.me')
    .controller('ItemsMeListController', ItemsMeListController);

  ItemsMeListController.$inject = ['ItemsService','IdService'];

  function ItemsMeListController(ItemsService, IdService) {
    var vm = this;

    vm.items = ItemsService.query(function (data) {
      var itemHolder = data;
      IdService.query(function (iData) {
        vm.users = iData;
        var fullList = vm.users;
        var n = vm.users.length;
        var me = [];
        for(var i=0;i<n;i++) {
          if(fullList[i].username === user.username){
            me.push(fullList[i]);
          }
        }
        vm.me = me;
        vm.me = vm.me[0]._id;
        
        var myItems = [];
        var m = itemHolder.length
        for(var j=0;j<m;j++) {
          if(itemHolder[i]._id === vm.me || itemHolder[i].lastBid === vm.me){
            myItems.push(itemHolder[j]);
          }
        }
      });
    });
  }
}());
