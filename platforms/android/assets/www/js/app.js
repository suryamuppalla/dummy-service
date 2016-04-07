var db = new loki('dump.json');
var app = angular.module('starter', ['ionic', 'ionic-material','ionic.rating','satellizer', 
    'ionic-toast','ngImgCrop', 'ngCordova', 'lokijs']);
app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
});
app.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
// parse initialization
app.run(function($rootScope) {
    $rootScope.Parse = Parse.initialize("NnGUQnFBGpBZKvrJpGbmD72J1IgThJgE61CJX92f", "My3u99rElpcHlIeczfqd3HAfB5Hw6BM5Un3D84Vl");;
});
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if ($auth.isAuthenticated()) {
                
                            return $location.path('/app/view-vehicle');
                        }
                    }
                }
            }
        }
    })

    .state('app.signup', {
        url: '/signup',
        views: {
            'menuContent': {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if ($auth.isAuthenticated()) {
                
                            return $location.path('/app/view-vehicle');
                        }
                    }
                }
            }
        }
    })

    .state('app.add-vehicle', {
        url: '/add-vehicle',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-vehicle.html',
                controller: 'addVehicleCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.vehicle-problem', {
        url: '/vehicle-problem',
        views: {
            'menuContent': {
                templateUrl: 'templates/vehicle-problem.html',
                controller: 'VehicleProblemCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.change-password', {
        url: '/change-password',
        views: {
            'menuContent': {
                templateUrl: 'templates/change-password.html',
                controller: 'ChangePasswordCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.view-vehicle', {
        url: '/view-vehicle',
        views: {
            'menuContent': {
                templateUrl: 'templates/view-vehicle.html',
                controller: 'ViewPropertiesCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })
    .state('app.vehicle-details', {
        url: '/view-vehicle/:objectId',
        views: {
            'menuContent': {
                templateUrl: 'templates/vehicle-details.html',
                controller: 'vehicleDetails',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })
    .state('app.rating', {
        url: '/rating',
        views: {
            'menuContent': {
                templateUrl: 'templates/rating.html',
                controller: 'RatingCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.aboutus', {
        url: '/aboutus',
        views: {
            'menuContent': {
                templateUrl: 'templates/aboutus.html',
                controller: 'AboutusCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.contactus', {
        url: '/contactus',
        views: {
            'menuContent': {
                templateUrl: 'templates/contactus.html',
                controller: 'ContactusCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.subscribenow', {
        url: '/subscribenow',
        views: {
            'menuContent': {
                templateUrl: 'templates/subscribenow.html',
                controller: 'SubscribeNowCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.service-req', {
        url: '/service-req',
        views: {
            'menuContent': {
                templateUrl: 'templates/service-req.html',
                controller: 'ServiceReqCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.edit-profile', {
        url: '/edit-profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/edit-profile.html',
                controller: 'EditProfileCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.view-request', {
        url: '/view-request',
        views: {
            'menuContent': {
                templateUrl: 'templates/view-request.html',
                controller: 'ViewReqCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
