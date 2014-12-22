(function(ng) {
    
    'use strict';

    ng.module('cejams')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/media', '/media/list');

            $stateProvider
                .state('media', {
                    abstract: true,
                    url: '/media',
                    controller: 'MediaCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        MediaDefinition : function getMediaDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('media');
                        },
                        Media: function mediaListResolve(Restangular) {
                            return Restangular.all('media').getList();
                        }
                    },
                })
                .state('media.list', {
                    url: '/list',
                    templateUrl: 'app/media/media-list.html'
                })
                .state('media.add', {
                    url: '/add',
                    templateUrl: 'app/media/media-add-edit.html'
                })
                .state('media.info', {
                    url: '/info/:id',
                    controller: 'SingleMediaCtrl',
                    templateUrl: 'app/media/media-info.html'
                })
                .state('media.edit', {
                    url: '/edit/:id',
                    controller: 'SingleMediaCtrl',
                    templateUrl: 'app/media/media-add-edit.html'
                });
        });
})(
    window.angular
);
