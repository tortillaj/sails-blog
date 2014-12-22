(function(ng) {
    
    'use strict';

    ng.module('cejams')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/posts', '/posts/list');

            $stateProvider
                .state('posts', {
                    abstract: true,
                    url: '/posts',
                    controller: 'PostCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        PostDefinition : function getPostDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('posts');
                        },
                        Posts: function postsListResolve(Restangular) {
                            return Restangular.all('posts').getList();
                        }
                    },
                })
                .state('posts.list', {
                    url: '/list',
                    templateUrl: 'app/post/post-list.html'
                })
                .state('posts.add', {
                    url: '/add',
                    templateUrl: 'app/post/post-add-edit.html'
                })
                .state('posts.info', {
                    url: '/info/:id',
                    controller: 'SinglePostCtrl',
                    templateUrl: 'app/post/post-info.html'
                })
                .state('posts.edit', {
                    url: '/edit/:id',
                    controller: 'SinglePostCtrl',
                    templateUrl: 'app/post/post-add-edit.html'
                });
        });
})(
    window.angular
);
