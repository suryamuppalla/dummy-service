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

      var Tenant = Parse.Object.extend("Tenant");
      var query = new Parse.Query(Tenant);
      query.equalTo("UserPointer", user);
      
      query.first().then(function(obj) {
        $scope.$apply($rootScope.firstname = obj.get("FirstName"));

        if (obj.get("active") == false){
            // toastr.error("Please activate your account");
        }
        else{
            
            var token = user.getSessionToken();
            $auth.setToken(token);
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.view-properties');
            // $window.location.reload();
        }
      }, function(h, error) {
        console.log(error.code, error.message);
      });

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