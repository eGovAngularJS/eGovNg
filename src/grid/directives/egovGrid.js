/**
* egog.ui.grid Module
*
* Description
*/
angular.module('egov.ui.grid', ['egov.ui.service']).
	directive('egovGrid', ['$log','gridDomParser','egovGrid', function($log,gridDomParser,egovGrid){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				dataset : "="
			}, // {} = isolate, true = child, false/undefined = no change
			restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '<div class="eGovGrid-container" ng-transclude></div>',
			// templateUrl: '',
			replace: true,
			// transclude: 'element',
			compile: function(tElement, tAttrs){
				// console.log(tElement);
				var columns = gridDomParser.buildColumn(tElement.find("table")),
						gridInstance,
						options = {
							forceFitColumns: true,
						  enableCellNavigation: true,
						  enableColumnReorder: false
						};
				
				tElement.addClass('eGovGrid-container');
				tElement.remove("table");

				gridInstance = egovGrid.$new(tAttrs.name,tElement, [], columns, options);

				return function linking($scope, iElm, iAttrs, controller){

					var data = [];
					$scope.$watch('dataset', function(newScopeData, oldScopeData) {
						gridInstance.setData(newScopeData,false);
						gridInstance.render();
					}, false);

				};
			}
		};
	}]);
