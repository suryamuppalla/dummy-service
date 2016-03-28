app.controller('MypaymentCtrl', ['$scope', '$q','$ionicHistory', function ($scope, $q, $ionicHistory) {
	var tpid  = window.localStorage.getItem("tenantpropertyid");
	var TenantProperties = Parse.Object.extend("TenantProperties");
	var Propertydata = new Parse.Query(TenantProperties);
	Propertydata.include("property")
	Propertydata.include("tenant")
	var deffered = $q.defer()
	$q.all([	
			Propertydata.get(tpid).then(function(result){
				var FuturePayments = Parse.Object.extend("FuturePayments");
				var PeningData = new Parse.Query(FuturePayments);
				PeningData.equalTo("tenantProperty", result);
				PeningData.equalTo("status", "pending");

				var PaidData = new Parse.Query(FuturePayments);
				PaidData.equalTo("tenantProperty", result);
				PaidData.equalTo("status", "paid");

				var OrQuery =  Parse.Query.or(PeningData, PaidData);
			
				OrQuery.find().then(function(response){
					$scope.pastdates = []
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
}]);