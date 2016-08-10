angular.module("bookstore_manage", ["ui.router", "book.ctrl"])
    .constant("URL", "http://119.29.75.199:3000/api/v1/manage/")
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.headers = {'Content-Type': 'application/json'}

        $stateProvider
            .state("home", {
                url: '/home',
                templateUrl: '/templates/home.html',
                controller: 'homeCtrl'
            })
            .state("user", {
                url: '/user',
                templateUrl: '/templates/user.html',
                controller: 'userCtrl'
            })
            .state("matter", {
                url: '/matter',
                abstract: true,
                templateUrl: '/templates/matter/index.html'
            })
            .state("matter.books", {
                url: "/books/:page",
                views: {
                    "matter-item": {
                        templateUrl: '/templates/matter/book.html',
                        controller: 'matter.books'
                    }
                }
            })
            .state("matter.comments", {
                url: "/comments/:page",
                views: {
                    "matter-item": {
                        templateUrl: '/templates/matter/comment.html',
                        controller: 'matter.comments'
                    }
                }
            })

        $urlRouterProvider.otherwise("/home")
    })
