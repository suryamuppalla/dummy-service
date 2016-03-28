app.controller('PropertyFutureDetailsCtrl', ['$scope', '$q', '$state', '$interval', '$stateParams','$ionicHistory', function ($scope, $q, $state, $interval, $stateParams,$ionicHistory) {
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
	var tpid  = $stateParams.tpId;
	var TenantProperties = Parse.Object.extend("TenantProperties");
	var Propertydata = new Parse.Query(TenantProperties);
	Propertydata.include("property");
	Propertydata.include("tenant");
	
	// loading spinner
	$scope.load = true;

	Propertydata.get(tpid).then(function(result){
		var FuturePayments = Parse.Object.extend("FuturePayments");
		var PeningData = new Parse.Query(FuturePayments);
		PeningData.equalTo("tenantProperty", result);
		PeningData.equalTo("status", "pending");

		// fetching data of future dates
		var FuturePayments = Parse.Object.extend("FuturePayments");
		var paymentdata = new Parse.Query(FuturePayments);
		paymentdata.equalTo("tenantProperty", result);
		paymentdata.equalTo("status", "due");
		paymentdata.limit(3);
		var data = Parse.Query.or(PeningData, paymentdata);

		data.find().then(function(response){
			
			$scope.insts = [];
			
			$.each(response, function(i){
				var obj = {}
				obj.count =  response[i].get("installmentNumber");
				obj.inst = response[i].get("dueDate");
				obj.dueamount = response[i].get("amountToBePaid");
				obj.paymentstatus = response[i].get("status");
				$scope.insts.push(obj);
			});

			$scope.load = false;
			$scope.$apply($scope.insts);
            
		}, function (error) {
			console.log(erro);
		});
	});
}]);