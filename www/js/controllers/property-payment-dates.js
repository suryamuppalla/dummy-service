app.controller('propertyPaymentDatesCtrl', ['$scope', '$timeout', '$stateParams', '$state', '$q','$ionicHistory', function($scope, $timeout, $stateParams, $state, $q,$ionicHistory){
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
	console.log('propertyPaymentDatesCtrl')
	var tpid  = $stateParams.tpId;
	var TenantProperties = Parse.Object.extend("TenantProperties");
	var Propertydata = new Parse.Query(TenantProperties);
	Propertydata.include("property")
	Propertydata.include("tenant")
	var deffered = $q.defer();
    $scope.load = true;
	$q.all([	
			Propertydata.get(tpid).then(function(result){
				var FuturePayments = Parse.Object.extend("FuturePayments");
				var PaidData = new Parse.Query(FuturePayments);
				PaidData.equalTo("tenantProperty", result);
				PaidData.equalTo("status", "paid");

				PaidData.find().then(function(response){
					$scope.pastdates = []
					$scope.load = false;
					$scope.$apply($.each(response, function(i){
						var obj = {}
						obj.count =  response[i].get("installmentNumber");
						obj.past = response[i].get("dueDate");
						obj.paidamount = response[i].get("amountToBePaid");
						obj.paystatus = response[i].get("status");
						$scope.pastdates.push(obj);
					})
					)
					deffered.resolve();
                    return deffered.promise;
                    
				})
			})
		])
}])