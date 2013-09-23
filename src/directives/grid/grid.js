/**
* egog.ui.grid Module
*
* Description
*/
angular.module('egov.ui.grid', ['egov.ui.service']).
directive('egovGrid', ['$log', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			dataset : "="
		}, // {} = isolate, true = child, false/undefined = no change
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			var gridInstance;
			var columns = [
			  {id: "title", name: "Title", field: "title"},
			  {id: "duration", name: "Duration", field: "duration"},
			  {id: "%", name: "% Complete", field: "percentComplete"},
			  {id: "start", name: "Start", field: "start"},
			  {id: "finish", name: "Finish", field: "finish"},
			  {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
			];

			var options = {
			  enableCellNavigation: true,
			  enableColumnReorder: false
			};

			var data = [];

			$scope.$watch('dataset', function(newScopeData, oldScopeData) {
				console.log(newScopeData.length);
				gridInstance.setData(newScopeData,false);
				gridInstance.render();
			}, false);

			gridInstance = new Slick.Grid(iElm, $scope.dataset || [], columns, options);
		}
	};
}]);

angular.module('egov.ui.grid').service();