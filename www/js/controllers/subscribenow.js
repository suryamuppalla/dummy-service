
app.controller('SubscribeNowCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 
    '$rootScope', '$window', '$q', 'ionicToast','$ionicHistory', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicHistory) {
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
	$scope.subdata = {};
	$scope.subscribe = function (){
		$scope.loginDisable = true;
		var currentUser = Parse.User.current();
		var Tenant = Parse.Object.extend("Tenant");
		var query = new Parse.Query(Tenant);
		query.equalTo("UserPointer", currentUser)

			query.first().then(function(response){
				var Subscriptions = Parse.Object.extend("Subscriptions");
				var sobj =  new Subscriptions()
				sobj.set("tenantPointer", response)
				sobj.set("email", $scope.subdata.email)
				var sub_acl = new Parse.ACL();
				sub_acl.setWriteAccess(currentUser, true)
				sub_acl.setReadAccess(currentUser, true)
				sub_acl.setRoleWriteAccess("admin", true)
				sub_acl.setRoleReadAccess("admin", true)
				sub_acl.setRoleWriteAccess("subadmin", true)
				sub_acl.setRoleReadAccess("subadmin", true)
				sub_acl.setRoleWriteAccess("manager", true)
				sub_acl.setRoleReadAccess("manager", true)
				sobj.setACL(sub_acl);
				$scope.load = sobj.save().then(function(result){
					/*toastr.success("Subscriptions enabled")*/
					$timeout(function() {$scope.load = false}, 1000);
            		ionicToast.show('Subscriptions enabled...', 'top', false, 5000);
            		$scope.loginDisable = false;
            		$ionicHistory.nextViewOptions({
                		disableBack: true
            		});
            		$state.go('app.view-properties');
					console.log("Subscriptions");
				}, function(error){
					$timeout(function() {$scope.load = false}, 1000);
            		ionicToast.show('Something went wrong:', 'top', false, 5000);
					/*toastr.error("Something went wrong:", error.msg)*/
				})
			})

	}

}]);