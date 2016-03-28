app.controller('PaymenthistoryCtrl', ['$scope', '$q','$ionicHistory', function ($scope,$q,$ionicHistory) {
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
	var currentUser = Parse.User.current();
	var Tenant = Parse.Object.extend("Tenant");
	var query = new Parse.Query(Tenant);
	query.equalTo("UserPointer", currentUser);
	query.first().then(function(result){
		var TenantPaymentHistory = Parse.Object.extend("TenantPaymentHistory");
		var tenantobj = new Parse.Query(TenantPaymentHistory);
		tenantobj.include("tenantPointer");
		tenantobj.include("tenantPropertyPointer");
		tenantobj.include("tenantPropertyPointer.property");
		tenantobj.equalTo("tenantPointer", result);
		$q.all([
			tenantobj.find().then(function(response){
				$scope.paymentlist =[];
				$.each(response, function(i) {
					var obj = {};
					obj.propertyname = response[i].get("tenantPropertyPointer").get("property").get("name");
					obj.paiddate = response[i].get("paymentDate");
					obj.paidamount = response[i].get("amountPaid");
					obj.transactionstatus = response[i].get("status");
					$scope.paymentlist.push(obj);
				})
			})
		]);
	})
}]);