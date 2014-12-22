(function(ng, _) {

    'use strict';

    ng.module('cejams')
        .controller('MediaCtrl', MediaCtrl)
        .controller('SingleMediaCtrl', SingleMediaCtrl);

    function MediaCtrl($scope, $state, Media, MediaDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('media'.toLowerCase());
        
        $scope.media = Media;
        $scope.model_def = MediaDefinition.originalElement;
        $scope.media = {};

        $scope.remove = function remove(media) {
            media = media || $scope.media;
            if (window.confirm('Are you sure you want to delete this media?')) {
                return resourceService.remove(media, $scope.media);
            }
        };

        $scope.save = function save(media) {
            media = media || $scope.media;
            return resourceService.save(media, $scope.media)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleMediaCtrl($scope, $stateParams, Media, MediaDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.media = _.find(Media, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
