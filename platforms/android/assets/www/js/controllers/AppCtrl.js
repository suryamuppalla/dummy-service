app.controller('AppCtrl', ['$scope', '$state', '$ionicScrollDelegate', '$ionicModal', '$ionicPopover', '$timeout', '$auth', '$window','$ionicHistory',
    function ($scope, $state, $ionicScrollDelegate, $ionicModal, $ionicPopover, $timeout, $auth, $window, $ionicHistory) {

    /*$ionicHistory.nextViewOptions({
        historyRoot: true
    });*/
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    // Form data for the login modal
    $scope.loginData = {};

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    };

    $scope.isAuthenticated = function() {
        $scope.user = JSON.parse(JSON.stringify(Parse.User.current()));
        return $auth.isAuthenticated();
    };

    $scope.logout = function() {
        Parse.User.logOut()
        $auth.logout();
        $window.location.reload();
    };

}]);
