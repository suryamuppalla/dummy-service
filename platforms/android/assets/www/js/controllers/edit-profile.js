app.controller('EditProfileCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 

    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading' ,'$ionicHistory', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory) {
    /*$ionicHistory.nextViewOptions({
      historyRoot: true
    });*/
      $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-assertive icon-loder"></ion-spinner>',
      });
	    var email = "";
  		var currentUser = Parse.User.current();
  		var Tenant = Parse.Object.extend("Tenant");
		var query = new Parse.Query(Tenant);
		query.equalTo("UserPointer", currentUser);
    $q.all([
		$scope.load = 
			query.first({
			  success: function(obj) {
			  		// console.log(object.get('FirstName'));
			  		$scope.perdata =  {};
			  		$scope.perdata.firstname=obj.get('FirstName');
			  		$scope.perdata.lastname=obj.get('LastName');
			  		$scope.perdata.email=obj.get('Email');
			  		$scope.perdata.phone=Number(obj.get('Contact_No'));
			  		$scope.perdata.address1=obj.get('addressLine1');
			  		$scope.perdata.address2=obj.get('addressLine2');
			  		$scope.perdata.city=obj.get('city');
			  		$scope.perdata.country=obj.get('country');
			  		$scope.perdata.pobox=obj.get('pobox');	
            $ionicLoading.hide();
			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			})
    ]);

		$scope.SavePersonalData=function(){
      $scope.loginDisable = true;
			var currentUser = Parse.User.current();
  			var Tenant = Parse.Object.extend("Tenant");
  			var query = new Parse.Query(Tenant);
  			query.equalTo("UserPointer", currentUser);
  			$q.all([
  				query.first().then(function(response){
  					response.set("FirstName", $scope.perdata.firstname);
  					response.set("LastName", $scope.perdata.lastname);
  					response.set("Contact_No", String($scope.perdata.phone));
  					response.set("addressLine1", $scope.perdata.address1);
  					response.set("addressLine2", $scope.perdata.address2);
  					response.set("city", $scope.perdata.city);
  					response.set("country", $scope.perdata.country);
  					response.set("pobox", parseInt($scope.perdata.pobox));
  					$scope.load =  response.save().then(function(data){
  						/*toastr.success("Personal details saved successfully")*/
  						$timeout(function() {$scope.load = false}, 1000);
        				ionicToast.show('Personal details saved successfully!!', 'top', false, 5000);
                $scope.loginDisable = false;
                $ionicHistory.nextViewOptions({
                  disableBack: true
                });
                $state.go('app.view-properties');
  					},function(error){
  						/*toastr.error("something went wrong");*/
  						$timeout(function() {$scope.load = false}, 1000);
        				ionicToast.show('something went wrong!!', 'top', false, 5000);
  					})
  				})
			])
			}
}]);