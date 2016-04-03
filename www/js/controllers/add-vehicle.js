app.controller('addVehicleCtrl', ['$scope', '$state', '$location', '$auth', '$timeout',

    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading' ,
    '$ionicHistory', 'VehicleService', '$ionicModal',
    function($scope, $state, $location, $auth, $timeout,
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory, VehicleService, $ionicModal) {

      console.log('add Vehicle controller');

      var Vehicle = Parse.Object.extend("Vehicle");
      var query = new Vehicle();
      console.log(query)

      $scope.addCar = function () {
        $scope.loginDisable = true;
        console.log('cropped image is ->>>', this.myCroppedImage)
        //upload profile picture first
        ////console.log($scope.fileName, $scope.myCroppedImage, $scope.imageExtension)
        if($scope.imageExtension){
         // saving base64 file into parse then after we can make reference that
         // file into user table
         var profiePic = new Parse.File('sample.'+ $scope.imageExtension,
                      { base64: this.myCroppedImage.split(",")[1]})
         $scope.vehicle = this.vehicle;
         profiePic.save().then(function(savedProfilePic){
            console.log($scope.vehicle)
            /* body... */
            query.set('type', $scope.vehicle.type.toLowerCase());
            query.set('name', $scope.vehicle.name.toLowerCase());
            query.set('model', $scope.vehicle.model.toLowerCase());
            query.set('manufactured', $scope.vehicle.manufactured);
            query.set('lastService', $scope.vehicle.lastService);
            query.set('userPointer', Parse.User.current())
            query.set('photo', savedProfilePic);
            query.save().then(function (success) {
                /* body... */
                    $timeout(function() {
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

        console.log(this.vehicle)
      }


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

app.directive('ionicAutocomplete',
    function ($ionicPopover) {
        var popoverTemplate =
         '<ion-popover-view style="margin-top:5px">' +
             '<ion-content>' +
                 '<div class="list">' +
                    '<a href="#" class="item" ng-repeat="item in items | filter:inputSearch" ng-click="selectItem(item)">{{item.display}}</a>' +
                 '</div>' +
             '</ion-content>' +
         '</ion-popover-view>';
        return {
            restrict: 'A',
            scope: {
                params: '=ionicAutocomplete',
                inputSearch: '=ngModel'
            },
            link: function ($scope, $element, $attrs, VehicleService) {
                var popoverShown = false;
                var popover = null;
                $scope.items = $scope.params.items;
                console.log('items is -->>>', $scope.items)
                //Add autocorrect="off" so the 'change' event is detected when user tap the keyboard
                $element.attr('autocorrect', 'off');
                popover = $ionicPopover.fromTemplate(popoverTemplate, {
                    scope: $scope
                });
                $element.on('focus', function (e) {
                    if (!popoverShown) {
                        popover.show(e);
                    }
                });

                $scope.selectItem = function (item) {
                    $element.val(item.display);
                    popover.hide();
                    $scope.params.onSelect(item);
                };
            }
        };
    }
);
