app.controller('ContactusCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 
    '$rootScope', '$window', '$q', 'ionicToast','$ionicHistory', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicHistory) {
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
    	$scope.cdata = {};
	$scope.contactus = function (){
		$scope.loginDisable = true;
		console.log("contact us")
		console.log("firstname:", String($scope.cdata.firstname));
		var currentUser = Parse.User.current();
		var Tenant = Parse.Object.extend("Tenant");
		var query = new Parse.Query(Tenant);
		query.equalTo("UserPointer", currentUser);
		
		query.first().then(function(response){	
			console.log(response);
			var ContactUs = Parse.Object.extend("ContactUs");
			var cobj =  new ContactUs()
			cobj.set("tenantPointer", response)
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
            	$state.go('app.view-properties');
				/*$scope.cdata.firstname = "";
				$scope.cdata.lastname = "";
				$scope.cdata.Message = "";*/
			}, function(error){
				// toastr.error("Something went wrong");
				$timeout(function() {$scope.load = false}, 1000);
        		ionicToast.show('Something went wrong', 'top', false, 5000);
				console.log(error);
			});
		});
	}
}]);