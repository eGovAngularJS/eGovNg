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

				gridInstance = new Slick.Grid(tElement, [], columns, options);

				return function linking($scope, iElm, iAttrs, controller){

					var data = [];
					$scope.$parent.test = 3;
					// console.log($scope.test);
					$scope.$watch('dataset', function(newScopeData, oldScopeData) {
						// console.log(newScopeData);
						gridInstance.setData(newScopeData,false);
						gridInstance.render();
					}, false);

				};
			}
		};
	}]);


angular.module('egov.ui.grid').provider('egovGrid', [function () {
	

	this.$get = [function() {
		return {

		};
	}];
}]);

angular.module('egov.ui.grid').factory('gridDomParser',function() {
	function buildColumn (tableEl) {
		var columns=[];
		angular.forEach(tableEl.find('th'), function(elm){
			var thEl = angular.element(elm),
					title = thEl.text();

			columns.push({
					name: title
				});
		});

		angular.forEach(tableEl.find('td'), function(elm,idx){

			var tdEl = angular.element(elm),
					expc = tdEl.html(),
					exp = expc.replace(/[{}|<>\s]/g, ""),
					column = columns[idx],
					width = Number(tdEl.attr("width")) || 100,
					resizable = tdEl.attr('resizable') === "true" ? true : false,
					sortable = tdEl.attr('sortable') === "true" ? true : false,
					formatter = tdEl.attr('formatter') || null,
					editorType = tdEl.attr('editorType') || null,
					doEditOnly = tdEl.attr('doEditOnly') || null,
					doNotEdit = tdEl.attr('doNotEdit') || null,
					comboBoxData = tdEl.attr('comboBoxData') || null;

					column.id = exp;
					column.field = exp;
					column.headerCssClass = exp;
					column.width =  width;
					column.resizable = resizable;
					column.sortable  = sortable;

					// comboBoxData : comboBoxData,
					// formatter : formatter,
					// editMod : editMod,
					// editorType : editorType,

					// tdClickFunc : column.attr("ng-click"),
					// tdDblClickFunc : column.attr('ng-dblclick')

		});

		return columns;
	}

	return {
		buildColumn : buildColumn
	};
});