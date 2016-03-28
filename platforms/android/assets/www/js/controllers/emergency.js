app.controller('EmergencyCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 
    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading','$ionicHistory', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicLoading,$ionicHistory) {
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
	$ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-assertive icon-loder"></ion-spinner>',
  	});
	var currentUser = Parse.User.current();
    var Tenant = Parse.Object.extend("Tenant");
    var query = new Parse.Query(Tenant);
    // comapring the current User id with the pointer
    query.equalTo("UserPointer", currentUser);
    $q.all([
    	$scope.load =query.first().then(function(response){
    		$scope.emrdata =  {};
			$scope.emrdata.guardianname = response.get("Guardian_Name");
			$scope.emrdata.relationship = response.get("RelationShip_With_Tenant");
			$scope.emrdata.emergencyphone = response.get("Emergency_Contact");
			$scope.emrdata.emergencyaddress = response.get("Relative_Address");
			$ionicLoading.hide();
	    })
    ]);

	
	$scope.SaveEmergenctDetails=function(){
		$scope.loginDisable = true;
	    var currentUser = Parse.User.current();
        var Tenant = Parse.Object.extend("Tenant");
        var query = new Parse.Query(Tenant);
        // comapring the current User id with the pointer
        query.equalTo("UserPointer", currentUser);
	    query.first({
	    	success: function (Obj) {
	    		Obj.set("Guardian_Name",$scope.emrdata.guardianname);
	    		Obj.set("RelationShip_With_Tenant", $scope.emrdata.relationship);
	    		Obj.set("Emergency_Contact", $scope.emrdata.emergencyphone);
	    		Obj.set("Relative_Address", $scope.emrdata.emergencyaddress);
	    		Obj.save();
	    		/*toastr.success("Details Saved Successfully!!")*/
	    		$timeout(function() {$scope.load = false}, 1000);
        		ionicToast.show('Details Saved Successfully!!', 'top', false, 5000);
        		$scope.loginDisable = false;
        		$ionicHistory.nextViewOptions({
                	disableBack: true
            	});
            	$state.go('app.view-properties');
	    	},
	    	error: function() {
	    		response.error("Failed Attempt!!");
	    	}

	    })

	}
}]);