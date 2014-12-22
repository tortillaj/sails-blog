(function(ng, _) {

    'use strict';

    ng.module('cejams')
        .controller('TagCtrl', TagCtrl)
        .controller('SingleTagCtrl', SingleTagCtrl);

    function TagCtrl($scope, $state, Tags, TagDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('tags'.toLowerCase());
        
        $scope.tags = Tags;
        $scope.model_def = TagDefinition.originalElement;
        $scope.tag = {};

        $scope.remove = function remove(tag) {
            tag = tag || $scope.tag;
            if (window.confirm('Are you sure you want to delete this tag?')) {
                return resourceService.remove(tag, $scope.tags);
            }
        };

        $scope.save = function save(tag) {
            tag = tag || $scope.tag;
            return resourceService.save(tag, $scope.tags)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleTagCtrl($scope, $stateParams, Tags, TagDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.tag = _.find(Tags, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
