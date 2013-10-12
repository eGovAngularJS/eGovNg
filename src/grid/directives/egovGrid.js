/**
* egog.ui.grid Module
*
* Description
*/
angular.module('egov.ui.grid', ['egov.ui.service']).
	directive('egovGrid', ['$log','egovGridHelper','egovGrid', function($log,egovGridHelper,egovGrid){
		return {
			scope: {
				dataset : "="
			},
			restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			replace: true,
			compile: function(tElement, tAttrs){
				var columns = egovGridHelper.buildColumn(tElement.find("table")),
						gridInstance,
						options = {
							explicitInitialization:true,
							rowHeight: (tElement.attr("row-height") !== undefined) ? Number(tElement.attr("row-height")) : 25, //36
							headerRowHeight: (tElement.attr("header-row-height") !== undefined) ? Number(tElement.attr("header-row-height")) : 25, //36
							forceFitColumns: (tElement.attr("row-height") === "false") ? false : true,
							fullWidthRows:true,
						  enableCellNavigation: true,
						  enableColumnReorder: (tElement.attr("enable-column-reorder") === "true") ? true : false,
						  enableAsyncPostRender: (tElement.attr("enable-async-post-render") === "true") ? true : false
						};

				tElement.addClass('eGovGrid-container');
				tElement.remove("table");

				gridInstance = egovGrid.$new(tAttrs.name,tElement, [], columns, options);

				return function linking($scope, iElm, iAttrs, controller){
					
					egovGridHelper.rebuildColumnWidhScope(columns,$scope);

					gridInstance.init();
					var data = [];
					$scope.$watch('dataset', function(newScopeData, oldScopeData) {
						gridInstance.setData(newScopeData,false);
						gridInstance.render();
					}, false);

				};
			}
		};
	}]);
