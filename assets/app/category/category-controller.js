(function(ng, _) {

    'use strict';

    ng.module('cejams')
        .controller('CategoryCtrl', CategoryCtrl)
        .controller('SingleCategoryCtrl', SingleCategoryCtrl);

    function CategoryCtrl($scope, $state, Categories, CategoryDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('categories'.toLowerCase());
        
        $scope.categories = Categories;
        $scope.model_def = CategoryDefinition.originalElement;
        $scope.category = {};

        $scope.remove = function remove(category) {
            category = category || $scope.category;
            if (window.confirm('Are you sure you want to delete this category?')) {
                return resourceService.remove(category, $scope.categories);
            }
        };

        $scope.save = function save(category) {
            category = category || $scope.category;
            return resourceService.save(category, $scope.categories)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleCategoryCtrl($scope, $stateParams, Categories, CategoryDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.category = _.find(Categories, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
