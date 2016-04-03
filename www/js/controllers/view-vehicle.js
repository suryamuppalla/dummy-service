app.controller('ViewPropertiesCtrl', ['$scope', '$ionicLoading', '$location', '$rootScope', '$auth', '$q','$ionicHistory', '$filter', '$timeout','$ionicModal',
    function ($scope, $ionicLoading, $location, $rootScope, $auth, $q,$ionicHistory, $filter, $timeout, $ionicModal) {
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
                $scope.noCarLength = (list.length) ? false: true;
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

        // modal start code
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function(car) {
            $scope.openCar = car;
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        // for request-modal
        // modal start code
        $ionicModal.fromTemplateUrl('request-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.requestModal = function(car) {
            $scope.modal1.show();
            $scope.requests = [];
            $.each(rawList, function(i) {
                if (car.objectId == rawList[i].id) {
                    var ServiceRequest = Parse.Object.extend('ServiceRequest');
                    var service = new Parse.Query(ServiceRequest);
                    service.equalTo('vehiclePointer', rawList[i]);
                    service.find().then(function (r) {
                        $scope.noRequest = (r.length) ? false: true;
                        $timeout(function () {$scope.requests = JSON.parse(JSON.stringify(r))}, 400);
                    }, function (error) {
                        console.log('error', error);
                    });

                };
            });
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal1.remove();
        });

        // for request-modal
        // modal start code
        $ionicModal.fromTemplateUrl('service-request.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
        $scope.serviceRequest = function(car) {
            $scope.modal2.show();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal2.remove();
        });

        // deleting the vehicle information
        $scope.deleteVehicle = function () {
            alert('delete vehicle')
        }
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
