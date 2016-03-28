app.controller('addVehicleCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 

    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading' ,'$ionicHistory', 'VehicleService', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory, VehicleService) {

      console.log('add Vehicle controller');

      var Vehicle = Parse.Object.extend("Vehicle");
      var query = new Vehicle();
      console.log(query)

      $scope.addCar = function () {
         /* body... */ 
         query.set('type', this.vehicle.type.toLowerCase());
         query.set('name', this.vehicle.name.toLowerCase());
         query.set('model', this.vehicle.model.toLowerCase());
         query.set('manufactured', this.vehicle.manufactured);
         query.set('lastService', this.vehicle.lastService);
         query.set('userPointer', Parse.User.current())
         query.save().then(function (success) {
            /* body... */ 
            $timeout(function() {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.view-vehicle')
            }, 1000);
         }, function (error) {
            /* body... */ 
            console.log('error', error)
         })

         console.log(this.vehicle)
      }
}]);

app.directive('ionicAutocomplete',
    function ($ionicPopover) {
        var popoverTemplate = 
         '<ion-popover-view style="margin-top:5px">' + 
             '<ion-content>' +
                 '<div class="list">' +
                    '<a href="#" class="item" ng-repeat="item in items | filter:inputSearch" ng-click="selectItem(item)">{{item.display}}</a>' +
                 '</div>' +
             '</ion-content>' +
         '</ion-popover-view>';
        return {
            restrict: 'A',
            scope: {
                params: '=ionicAutocomplete',
                inputSearch: '=ngModel'
            },
            link: function ($scope, $element, $attrs, VehicleService) {
                var popoverShown = false;
                var popover = null;
                $scope.items = $scope.params.items;
                console.log('items is -->>>', $scope.items)
                //Add autocorrect="off" so the 'change' event is detected when user tap the keyboard
                $element.attr('autocorrect', 'off');


                popover = $ionicPopover.fromTemplate(popoverTemplate, {
                    scope: $scope
                });
                $element.on('focus', function (e) {
                    if (!popoverShown) {
                        popover.show(e);
                    }
                });

                $scope.selectItem = function (item) {
                    $element.val(item.display);
                    popover.hide();
                    $scope.params.onSelect(item);
                };
            }
        };
    }
);
