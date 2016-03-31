app.controller('EditProfileCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 

    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading' ,
    '$ionicHistory', 'VehicleService', '$ionicModal', 
    function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory, VehicleService, $ionicModal) {

    // image upload code start
    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      $scope.fileName=file.name;

      $scope.imageExtension = $scope.fileName.split('.').pop();
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
          $(".cropArea").show();
          $(".src-image").show();
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    
}]);
