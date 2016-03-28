app.controller('ViewPropertiesCtrl', ['$scope', '$location', '$rootScope', '$auth', '$q','$ionicHistory', '$filter', '$timeout',
	function ($scope, $location, $rootScope, $auth, $q,$ionicHistory, $filter, $timeout) {

	var Cars = Parse.Object.extend("Cars");
	var query = new Parse.Query(Cars);
	
	query.find().then(function (list) {
		/* body... */ 
		$scope.carArray = JSON.parse(JSON.stringify(list));


	}, function (error) {
		 /* body... */
		 console.log(error); 
	})
}])

app.directive('tooltip', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (attrs.title) {
                var $element = $(element);
                $element.attr("title", attrs.title)
                $element.tooltipster({
                    animation: attrs.animation,
                    trigger: "click",
                    position: "top",
                    positionTracker: true,
                    maxWidth: 500,
                    contentAsHTML: true
                });
            }
        }
    };
});