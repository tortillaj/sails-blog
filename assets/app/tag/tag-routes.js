(function(ng) {
    
    'use strict';

    ng.module('cejams')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/tags', '/tags/list');

            $stateProvider
                .state('tags', {
                    abstract: true,
                    url: '/tags',
                    controller: 'TagCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        TagDefinition : function getTagDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('tags');
                        },
                        Tags: function tagsListResolve(Restangular) {
                            return Restangular.all('tags').getList();
                        }
                    },
                })
                .state('tags.list', {
                    url: '/list',
                    templateUrl: 'app/tag/tag-list.html'
                })
                .state('tags.add', {
                    url: '/add',
                    templateUrl: 'app/tag/tag-add-edit.html'
                })
                .state('tags.info', {
                    url: '/info/:id',
                    controller: 'SingleTagCtrl',
                    templateUrl: 'app/tag/tag-info.html'
                })
                .state('tags.edit', {
                    url: '/edit/:id',
                    controller: 'SingleTagCtrl',
                    templateUrl: 'app/tag/tag-add-edit.html'
                });
        });
})(
    window.angular
);
