(function(ng, _) {

    'use strict';

    ng.module('cejams')
        .controller('PostCtrl', PostCtrl)
        .controller('SinglePostCtrl', SinglePostCtrl);

    function PostCtrl($scope, $state, Posts, PostDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('posts'.toLowerCase());
        
        $scope.posts = Posts;
        $scope.model_def = PostDefinition.originalElement;
        $scope.post = {};

        $scope.remove = function remove(post) {
            post = post || $scope.post;
            if (window.confirm('Are you sure you want to delete this post?')) {
                return resourceService.remove(post, $scope.posts);
            }
        };

        $scope.save = function save(post) {
            post = post || $scope.post;
            return resourceService.save(post, $scope.posts)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SinglePostCtrl($scope, $stateParams, Posts, PostDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.post = _.find(Posts, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
