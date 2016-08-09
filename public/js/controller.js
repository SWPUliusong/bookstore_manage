angular.module('book.ctrl', [])
    .controller('homeCtrl', function($rootScope, $scope, $http) {
        $rootScope.title = "bookstore后台主页"
        angular.element(".menue-item-home").addClass("active").siblings().removeClass("active")
        return $http.jsonp("http://localhost:3000/api/v1/manage/webInfo?callback=JSON_CALLBACK")
            .success(function(data) {
                $scope.webInfo = data.webInfo
                $scope.serverInfo = data.serverInfo
            })
    })
    .controller('userCtrl', function($rootScope, $http, $scope) {
        $rootScope.title = "用户管理"
        angular.element(".menue-item-user").addClass("active").siblings().removeClass("active")
        $http.jsonp("http://localhost:3000/api/v1/manage/user?callback=JSON_CALLBACK")
            .success(function(data) {
                $scope.users = data
            })

        $scope.resetPas = function(id) {
            $http.put("http://localhost:3000/api/v1/manage/user", 'id=' + id)
                .success(function(data) {
                    alert("重置成功")
                })
                .error(function() {
                    alert("重置失败，发生未知错误")
                })
            return false
        }

        $scope.resetForm = function() {
            angular.element("form").trigger('reset')
        }

        $scope.submitForm = function() {
            console.log($scope.data)
            if($scope.data.password === $scope.password_rep) {
                $http.post("http://localhost:3000/api/v1/manage/user", $scope.data)
                    .success(function(res) {
                        $scope.users = res
                    })

                $scope.resetForm();
                angular.element('button[class="close"]').trigger('click')
            }
            else {
                alert("两次密码不一致")
            }
            return false
        }
    })
    .controller("matter.books", function($scope, $http, $stateParams, $rootScope) {
        $rootScope.title = '内容管理-书籍'
        angular.element(".menue-item-matter").addClass("active").siblings().removeClass("active")
        angular.element(".menue-item-book").addClass("active").siblings().removeClass("active")
        $rootScope.pages = []   //分页
        var p = $stateParams.page

        $http.jsonp("http://localhost:3000/api/v1/manage/matter/books?callback=JSON_CALLBACK&page=" + p)
            .success(function(res) {
                $scope.books = res.books
                var count = Math.ceil(res.total / 10)
                while(count--) {
                    $rootScope.pages.push(count)
                }
            })

        $scope.deleteBook = function(id) {
            if(!confirm("确认删除")) return false

            $http.delete("http://localhost:3000/api/v1/manage/matter/books?page=" + p +"&id=" + id)
                .success(function(res) {
                    $scope.books = res[0]
                    $rootScope.pages = $rootScope.pages.slice(0, Math.ceil(res[1] / 10))
                })
                .error(function(err) {
                    alert(err.message)
                })
        }
    })
    .controller("matter.comments", function($scope, $http, $stateParams, $rootScope){
        $rootScope.title = '内容管理-评论'
        angular.element(".menue-item-matter").addClass("active").siblings().removeClass("active")
        angular.element(".menue-item-comment").addClass("active").siblings().removeClass("active")
        $rootScope.pages = []   //分页

        var p = $stateParams.page

        $http.jsonp("http://localhost:3000/api/v1/manage/matter/comments?callback=JSON_CALLBACK&page=" + p)
            .success(function(res) {
                $scope.comments = res.comments
                var count = Math.ceil(res.total / 10)
                while(count--) {
                    $rootScope.pages.push(count)
                }
            })

        $scope.deleteComment = function(id) {
            if(!confirm("确认删除")) return false

            $http.delete("http://localhost:3000/api/v1/manage/matter/comments?page=" + p +"&id=" + id)
                .success(function(res) {
                    $scope.comments = res[0]
                    $rootScope.pages = $rootScope.pages.slice(0, Math.ceil(res[1] / 10))
                })
                .error(function(err) {
                    alert(err.message)
                })
        }
    })
