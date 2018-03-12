angular.module('venture', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl',
            // data: {
            //     activeTab: 'home'
            // }
        })
        .state('keyword', {
            url: '/keyword',
            templateUrl: 'views/keywords.html',
            controller: 'keywordCtrl',
            controllerAs: 'keyCtrl',
            // data: {
            //     activeTab: 'keyword'
            // }
        })
        .state('images', {
            url: '/images/:keyword',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashCtrl',
            // data: {
            //   activeTab: 'keyword'
            // }
        })
    }])
// create the controller and inject Angular's $scope
.service('services', function($http) {
})
.controller('HomeController', function ($scope, $http, $rootScope) {
    var vm = this;
    $rootScope.loader = false;
    vm.getKeyWordByName = function (name) {
        $http.get('/api/getKeywordByName/' + name).then(function (data) {
            if (!data.data) {
                $http.post('/api/saveKeyword', {
                    keywordName: name
                }).then(function (res) {
                    $http.post('/api/loadImagesToServer', {
                        keywordName: name
                    }).then(function(data) {
                        $rootScope.loader = false;
                        alert("Data saved successfully !!!");
                    })
                })
            }
        })
    }
    vm.saveKeyword = function () {
        $rootScope.loader = true;
        vm.getKeyWordByName($scope.keywordName);
    };
})
.controller('keywordCtrl', function ($scope, $http) {  
    var vm = this;
    vm.getAllKeywords = function() {
        $http.get('/api/getAllKeywords')
        .then(function(res) {
            vm.keywordsList = res.data;
        }).catch(function(rej){
            
        })
    }
    vm.getAllKeywords();
    
})
.controller('DashboardController', function ($scope, $stateParams, $http) {
    var vm = this;
    vm.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    vm.value = $stateParams.keyword;
});




