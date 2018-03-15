angular.module('venture', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
            })
            .state('keyword', {
                url: '/keyword',
                templateUrl: 'views/keywords.html',
                controller: 'keywordCtrl',
                controllerAs: 'keyCtrl',
            })
            .state('images', {
                url: '/images/:keyword',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashCtrl',
            })
    }])
    // create the controller and inject Angular's $scope
    .controller('HomeController', function ($scope, $http, $rootScope) {
        var vm = this;
        $rootScope.loader = false;
        vm.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        vm.showImages = false;
        vm.disableButton = false;
        vm.getKeyWordByName = function (name) {
            return $http.get('/api/getKeywordByName/' + name).then((data) => {
                return data;
            });
        }
        vm.saveKeyword = function (name) {
            $rootScope.loader = true;
            vm.showImages = false;
            vm.disableButton = true;
            vm.getKeyWordByName(name).then((res) => {
                if (!res.data) {
                    $http.post('/api/saveKeyword', {
                        keywordName: name
                    }).then(() => {
                        alert("Data saved successfully !!!");
                        $rootScope.loader = false;
                        vm.value = name;
                        vm.showImages = true;
                        vm.disableButton = false;
                    });
                }
                else {
                    alert("Keyword already saved. Getting Data from locally !!!");
                    $rootScope.loader = false;
                    vm.value = name;
                    vm.showImages = true;
                    vm.disableButton = false;
                }
            });
        };
    })
    .controller('keywordCtrl', function ($scope, $http) {
        var vm = this;
        vm.getAllKeywords = function () {
            $http.get('/api/getAllKeywords')
                .then(function (res) {
                    vm.keywordsList = res.data;
                }).catch(function (rej) {

                })
        }
        vm.getAllKeywords();

    })
    .controller('DashboardController', function ($scope, $stateParams, $http) {
        var vm = this;
        vm.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        vm.value = $stateParams.keyword;
    });




