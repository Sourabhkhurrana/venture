angular.module('venture', [])
    .service('ventureService', function(){
        this.getAllKeywords = function(){
            $http.get('/api/getAllKeywords').then(function(res) {
            }).catch(function(rej){
            });
        }
    })