app.controller('PropertyCtrl', ['$scope', '$q', '$timeout', '$location', '$stateParams', '$ionicHistory', '$state',
	function ($scope, $q, $timeout, $location, $stateParams, $ionicHistory, $state) {
	//cicrcle charts start
	$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  	$scope.data = [300, 500, 100];
  	//cicrcle charts end
  	//bar chart start
  	$scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  	$scope.series = ['Series A', 'Series B'];

  	$scope.data2 = [
    	[65, 59, 80, 81, 56, 55, 40],
    	[28, 48, 40, 19, 86, 27, 90]
  	];
  	//bar chart end
	//This will hide the DIV by default.
    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.ShowPassport;
    };

    // go for payment
    $scope.goForPayment = function (propertyId, paymentId) {
        console.log(propertyId, paymentId);

        $state.go('app.bill-rent', {tpId: propertyId, paymentRowId: paymentId})
    };
	$scope.tpid  = $stateParams.tpId;
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
	var TenantProperties = Parse.Object.extend("TenantProperties");
	var Propertydata = new Parse.Query(TenantProperties);
	Propertydata.include("property")
	Propertydata.include("tenant")
	var deffered = $q.defer()
	$q.all([	
			Propertydata.get($scope.tpid).then(function(result){
				$scope.rentvalue = result.get("rentValue");
				$scope.paymentcycle = result.get('paymentFreaquency');;
				$scope.duemoney = (result.get('paymentAmount'));

				console.log('--------- duemoney 1 -->>', $scope.duemoney)
				$scope.propertyname = result.get('property').get("name");
				$scope.address = result.get('property').get("address");
				var FuturePayments = Parse.Object.extend("FuturePayments");
				var paymentdata = new Parse.Query(FuturePayments);
				paymentdata.equalTo("tenantProperty", result);
				$scope.load = paymentdata.find().then(function(data){
					var CurrentDate =  new Date()
					// console.log("due date:", $scope.duedate)
					$scope.$apply($.each(data, function(i){
						if (data[i].get("status") == "due" && data[i].get("dueDate") < CurrentDate){
							data[i].set("status", "pending");
							data[i].save().then(function(obj){
								console.log("saved data");
							})
						}
						
					})
					)
				},function(error){
					// toastr.error("something went wrong");
					console.log(error);
				});

				// Fetching the data of pending and paid
				var FuturePayments = Parse.Object.extend("FuturePayments");
				var PeningData = new Parse.Query(FuturePayments);
				PeningData.equalTo("tenantProperty", result);
				PeningData.equalTo("status", "pending");

				// fetching data of future dates
				paymentdata.equalTo("tenantProperty", result);
				paymentdata.equalTo("status", "due");
				paymentdata.limit(3);
                var data = Parse.Query.or(PeningData, paymentdata);
				data.find().then(function(response){

					console.log(JSON.parse(JSON.stringify(response)))
					$scope.duedate = response[0].get("dueDate");
					$scope.insts = []
					$scope.$apply($.each(response, function(i){
                        // console.log(JSON.parse(JSON.stringify(response[i])))
						var obj = {};
                        obj.tpId = response[i].get('tenantProperty').id;
						obj.id = response[i].id;
						obj.count =  response[i].get("installmentNumber");
						obj.inst = response[i].get("dueDate");
						obj.dueamount = response[i].get("amountToBePaid");
						obj.paymentstatus = response[i].get("status");
						$scope.insts.push(obj);
					})
					)
				});

				var FuturePayments = Parse.Object.extend("FuturePayments");
				var PaidData = new Parse.Query(FuturePayments);
				PaidData.equalTo("tenantProperty", result);
				PaidData.equalTo("status", "paid");
				// data.limit(3);
				PaidData.find().then(function(response){
					$scope.pastdates = [];
					$scope.$apply($.each(response, function(i){
						if (response[i].get("status") == "pending"){
							$scope.duemoney += response[i].get("amountToBePaid");	

							$scope.$apply($scope.duemoney);						
						}
						var obj = {};
                        obj.tpId = response[i].get('tenantProperty').id;
                        obj.id = response[i].id;
						obj.count =  response[i].get("installmentNumber");
						obj.past = response[i].get("dueDate");
						obj.paidamount = response[i].get("amountToBePaid");
						obj.paystatus = response[i].get("status");
						$scope.pastdates.push(obj);
					})
					)

					console.log('----past dates -- ', $scope.pastdates)
				})
			})
	]);

	return deffered.promise;
}]);