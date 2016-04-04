app.controller('ViewPropertiesCtrl', ['$scope', '$ionicLoading', '$location', '$rootScope', '$auth', '$q',
    '$ionicHistory', '$filter', '$timeout','$ionicModal', '$ionicPopup', '$state', '$stateParams', '$cordovaSQLite',
    function ($scope, $ionicLoading, $location, $rootScope, $auth, $q,$ionicHistory, $filter, $timeout,
              $ionicModal, $ionicPopup, $state, $stateParams, $cordovaSQLite) {
        $scope.doRefresh = function() {
            loadVehicles();
            $scope.$broadcast('scroll.refreshComplete');
        };
        var rawList = [];
        $scope.carArray = [];
        function loadVehicles() {
            $ionicLoading.show();
            var Vehicle = Parse.Object.extend("Vehicle");
            var query = new Parse.Query(Vehicle);
            query.equalTo('userPointer', Parse.User.current());
            query.find().then(function (list) {
                rawList = list;
                $scope.carArray = JSON.parse(JSON.stringify(list));
                $ionicLoading.hide();
                $scope.$apply()
            }, function (error) {
                /* body... */
                console.log(error);
            });
        }
        loadVehicles();
        // goto vehicle details
        $scope.go_to_vehicle_details = function (id) {
            $state.go('app.vehicle-details', {objectId: id});
        };
    }]);

app.directive('tooltip', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (attrs.title) {
                var $element = $(element);
                $element.attr("title", attrs.title)
                $element.tooltipster({
                    animation: attrs.animation,
                    trigger: "click",
                    position: "top",
                    positionTracker: true,
                    maxWidth: 500,
                    contentAsHTML: true
                });
            }
        }
    };
});
