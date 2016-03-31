app.controller('EditProfileCtrl', ['$scope', '$state', '$location', '$auth', '$timeout',

    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading' ,
    '$ionicHistory', 'VehicleService', '$ionicModal',
    function($scope, $state, $location, $auth, $timeout,
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory, VehicleService, $ionicModal) {

    $scope.user = JSON.parse(JSON.stringify(Parse.User.current()));
    console.log($scope.user);
    // uploading the new edited information of the user
    $scope.uploadNewInfo = function () {
      console.log('cropped image is ->>>', this.myCroppedImage)
      //upload profile picture first
      ////console.log($scope.fileName, $scope.myCroppedImage, $scope.imageExtension)
      if($scope.imageExtension){
       // saving base64 file into parse then after we can make reference that
       // file into user table
       var profiePic = new Parse.File('sample.'+ $scope.imageExtension,
                    { base64: this.myCroppedImage.split(",")[1]})
       $scope.vehicle = this.user;
       profiePic.save().then(function(savedProfilePic){

         var current = Parse.User.current();
         current.set('image', savedProfilePic);
         current.set('firstName', $scope.vehicle.firstName);
         current.set('lastName', $scope.vehicle.lastName)
         current.save().then(function (success) {
              /* body... */
                  $timeout(function() {
                      ionicToast.show('Details updated!!', 'top', false, 2500)
                      $ionicHistory.nextViewOptions({
                          disableBack: true
                      });
                      $state.go('app.view-vehicle')
                  }, 1000);
              }, function (error) {
                $scope.loginDisable = false;
              /* body... */
              console.log('error', error);
              })
          }, function(error){
             $scope.loginDisable = false;
             ionicToast.show('something went wrong', 'top', false, 2500)
          })
      }else{
          $scope.loginDisable = false;
          ionicToast.show('Please upload an image!', 'top', false, 2500)
      }
    }; // end of the function

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
