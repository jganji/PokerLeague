(function () {
  'use strict';

  angular
    .module('app.event')
    .controller('EventViewCtrl', EventViewCtrl);

  EventViewCtrl.$inject = ['$stateParams', '$ionicPopup', 'eventService', 'routeService'];

  //////////////

  function EventViewCtrl($stateParams, $ionicPopup, eventService, routeService) {
    var vm = this;
    var eventId = $stateParams.id;

    vm.event = getEvent();
    vm.members = getEventMembers();
    vm.activities = getEventActivities();
    vm.saveNote = saveNote;
    vm.editEvent = editEvent;
    vm.addBuyIn = addBuyIn;
    vm.addResult = addResult;
    vm.memberBuyinsTotal = memberBuyinsTotal;
    vm.memberResultsTotal = memberResultsTotal;

    function getEvent() {
      return eventService.getEvent(eventId);
    }

    function getEventMembers() {
      return eventService.getEventMembers(eventId)
    }

    function getEventActivities() {
      return eventService.getEventActivities(eventId)
    }

    function deleteActivity(activityId) {
      eventService.deleteActivity(activityId)
        .then(function(response) {
          if (response.error) {
            $ionicPopup.alert({title:"Error", template:"A problem occurred deleting the activity. Please try again."});
          } else {
            vm.activities = eventService.getEventActivities(eventId);
          }
        });
    }

    function saveNote() {
      if (vm.noteText.length > 0) {
        eventService.saveEventActivity(eventId, vm.noteText)
          .then(function(response) {
            if (response.error) {
              $ionicPopup.alert({title:"Error", template:"A problem occurred saving the note. Please try again."});
            } else {
              vm.noteText = "";
              vm.activities = eventService.getEventActivities(eventId);
            }
          });
      }
    }

    function editEvent() {
      routeService.go('tab.eventEdit', {id: vm.event.id, seasonId: vm.event.season.id});
    }

    function addBuyIn() {
      routeService.go('tab.eventAddBuyIn', {id: vm.event.id, seasonId: vm.event.season.id});
    }

    function addResult() {
      routeService.go('tab.eventAddResult', {id: vm.event.id, seasonId: vm.event.season.id});
    }

    function memberBuyinsTotal() {
      var total = 0;
      _.each(vm.members, function (member) {
        total += member.buyins;
      });
      return total;
    }

    function memberResultsTotal() {
      var total = 0;
      _.each(vm.members, function (member) {
        total += member.results;
      });
      return total;
    }
  }

})();
