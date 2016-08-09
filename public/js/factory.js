angular.module('book.factory', [])
    .factory('webMsg', function($http) {
        return $http.jsonp("http://localhost:3000/api/v1/manage/webInfo?callback=JSON_CALLBACK")
            .success(function(data) {
                return data
            })
    })