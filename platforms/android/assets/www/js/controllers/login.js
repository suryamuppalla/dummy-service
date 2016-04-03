app.controller('LoginCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 
    '$rootScope', '$window', '$q', 'ionicToast','$ionicHistory', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicHistory) {
  	/*$ionicHistory.nextViewOptions({
        historyRoot: true
    });*/
  $scope.UserLogin =  function(){
    $scope.load = true;
    $scope.loginDisable = true;


    Parse.User.logIn(this.formData.email, this.formData.password)
    .then(function(user) {

      $scope.$apply($rootScope.firstname = user.get("firstName"));

        /*if (user.get("emailVerified") == false){
            ionicToast.show('Please activate your account!', 'top', false, 5000);
        }
        else{*/
            
            var token = user.getSessionToken();
            $auth.setToken(token);
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.view-vehicle');
        // }

    }, function (error) {
      $scope.loginDisable = false;
      $timeout(function() {$scope.load = false}, 1000);
      console.log('error is', error)
      ionicToast.show('Invalid details', 'top', false, 5000);
    });
  };

  $scope.go_signup = function () {
    $state.go('app.signup')
  }
  
}]);