(function(ng) {
    
    'use strict';

    ng.module('cejams')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/categories', '/categories/list');

            $stateProvider
                .state('categories', {
                    abstract: true,
                    url: '/categories',
                    controller: 'CategoryCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        CategoryDefinition : function getCategoryDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('categories');
                        },
                        Categories: function categoriesListResolve(Restangular) {
                            return Restangular.all('categories').getList();
                        }
                    },
                })
                .state('categories.list', {
                    url: '/list',
                    templateUrl: 'app/category/category-list.html'
                })
                .state('categories.add', {
                    url: '/add',
                    templateUrl: 'app/category/category-add-edit.html'
                })
                .state('categories.info', {
                    url: '/info/:id',
                    controller: 'SingleCategoryCtrl',
                    templateUrl: 'app/category/category-info.html'
                })
                .state('categories.edit', {
                    url: '/edit/:id',
                    controller: 'SingleCategoryCtrl',
                    templateUrl: 'app/category/category-add-edit.html'
                });
        });
})(
    window.angular
);
