(function () {
  'use strict';

  angular
    .module('app.event')
    .controller('EventEditCtrl', EventEditCtrl);

  EventEditCtrl.$inject = ['$state', '$stateParams', 'Event', 'Profile'];

  //////////////

  function EventEditCtrl($state, $stateParams, Event, Profile) {
    var vm = this;
    vm.hostId = "1";
    vm.event = getEvent();
    vm.users = getUsers();
    vm.saveEvent = saveEvent;
    vm.deleteEvent = deleteEvent;

    function getEvent() {
      var event;

      if ($stateParams.id) {
        event = Event.get({id: $stateParams.id});
      } else {
        event = new Event();
        event.isActive = false;
      }

      return event;
    }

    function getUsers() {
      return Profile.query();
    }

    function saveEvent() {
      vm.event.$save()
        .then(function () {
          $state.go('tab.eventView', {id: vm.event.id});
        });
    }

    function deleteEvent() {
      var msg = "Are you sure you want to delete the " + vm.event.name + " event?\n\n"
        + "WARNING! Deleting your event will also delete all information tied to an event.";

      if (window.confirm(msg)) {
        vm.event.$delete()
          .then(function () {
            $state.go('tab.eventView', {id: vm.event.id});
          });
      }
    }
  }

})();
