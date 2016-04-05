/**
 * Created by ehapi on 4/4/16.
 */
app.controller('vehicleDetails', ['$scope', '$ionicLoading', '$location', '$rootScope', '$auth', '$q',
    '$ionicHistory', '$filter', '$timeout','$ionicModal', '$ionicPopup', '$state', '$stateParams',
    function ($scope, $ionicLoading, $location, $rootScope, $auth, $q,$ionicHistory, $filter, $timeout,
              $ionicModal, $ionicPopup, $state, $stateParams) {
        
        var def = $q.defer();
        var vObject = {};
        var Vehicle = Parse.Object.extend("Vehicle");
        var query = new Parse.Query(Vehicle);
        query.equalTo('userPointer', Parse.User.current());
        query.equalTo('objectId', $stateParams.objectId);
        query.first().then(function (list) {
            vObject = list;
            $scope.vehicle = JSON.parse(JSON.stringify(list));
            $scope.$apply($scope.vehicle);
            console.log($scope.vehicle)
        }, function (error) {
            console.log(error)
        });

        /* =========== code for colsplble menus ======== */

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
              $scope.shownGroup = null;
            } else {
              $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        /* =========== code for tabs concept ========== */
        $('.tabe').click(function(event) {
            event.preventDefault();
            /* Act on the event */
            $('.tabe').removeClass('active');
            $(this).addClass('active');
            // Remove the 'content' class from the visible tab contents.
            $('.content').removeClass('content-active');
            // Add the 'content' class to the associated tab contents.
            $($(this).attr("rel")).addClass('content-active');
        });

        $('.tabe2').click(function(event) {
            event.preventDefault();
            /* Act on the event */
            $('.tabe2').removeClass('active2');
            $(this).addClass('active2');
            // Remove the 'content' class from the visible tab contents.
            $('.content2').removeClass('content-active2');
            // Add the 'content' class to the associated tab contents.
            $($(this).attr("rel")).addClass('content-active2');
        });
    }]);