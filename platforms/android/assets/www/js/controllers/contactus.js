app.controller('ContactusCtrl', ['$scope', '$state', '$location', '$auth', '$timeout',
    '$rootScope', '$window', '$q', 'ionicToast','$ionicHistory', function($scope, $state, $location, $auth, $timeout,
    $rootScope, $window, $q, ionicToast,$ionicHistory) {

  $scope.cdata = {};
	$scope.contactus = function (){
		$scope.loginDisable = true;
			var ContactUs = Parse.Object.extend("ContactUs");
			var cobj =  new ContactUs();
      cobj.set('userPointer', Parse.User.current());
			cobj.set("firstName", String($scope.cdata.firstname))
			cobj.set("lastName", String($scope.cdata.lastname))
			cobj.set("message", String($scope.cdata.Message))
			cobj.save().then(function(response){
				// toastr.success("Your request has been submitted successfully...!")
				$timeout(function() {$scope.load = false}, 1000);
    		ionicToast.show('Your request has been submitted successfully...!', 'top', false, 5000);
    		$scope.loginDisable = false;
    		$ionicHistory.nextViewOptions({
            	disableBack: true
        });
        $state.go('app.view-vehicle');
	    }, function(error) {
        console.log('error is ->>', error);
        ionicToast.show('Something went wrong!', 'top', false, 2000);
      });
	}; // end of the function
}]);
