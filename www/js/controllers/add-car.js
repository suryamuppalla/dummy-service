app.controller('EditProfileCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 

    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading' ,'$ionicHistory', 'CarService', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory, CarService) {

      console.log('add car controller');

      var Cars = Parse.Object.extend("Cars");
      var query = new Cars();
      console.log(query)

      $scope.addCar = function () {
         /* body... */ 
         query.set('name', this.car.name.toLowerCase());
         query.set('model', this.car.model.toLowerCase());
         query.set('manufactured', this.car.manufactured);
         query.set('lastService', this.car.lastService);
         query.save().then(function (success) {
            /* body... */ 
            $timeout(function() {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.view-cars')
            }, 1000);
         }, function (error) {
            /* body... */ 
            console.log('error', error)
         })

         console.log(this.car)
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
            link: function ($scope, $element, $attrs, CarService) {
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
