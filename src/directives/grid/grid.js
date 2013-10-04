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
							explicitInitialization:true,
							rowHeight: 36,
							headerRowHeight: 36,
							forceFitColumns: true,
							fullWidthRows:true,
						  enableCellNavigation: true,
						  enableColumnReorder: false
						};
				
				tElement.addClass('eGovGrid-container');
				tElement.remove("table");

				gridInstance = egovGrid.$new(tAttrs.name,tElement, [], columns, options);

				return function linking($scope, iElm, iAttrs, controller){
					gridInstance.init();
					console.log("?");
					var data = [];
					$scope.$watch('dataset', function(newScopeData, oldScopeData) {
						gridInstance.setData(newScopeData,false);
						gridInstance.render();
					}, false);

				};
			}
		};
	}]);

angular.module('egov.ui.grid').provider('egovGrid', [function () {
	var options = {},
			columns = {},
			grids = {},
			dataViewType = {};

	//eGogGrid 선언
	function egoVGrid(container, data, columns, options) {
		Slick.Grid.apply(this, [container, data, columns, options]);
	}
	
	//SlickGrid의 모든 메소드 상속
	jQuery.extend(true, egoVGrid.prototype, Slick.Grid.prototype);
	egoVGrid.prototype.constructor = egoVGrid;


	this.setOptions = function(name, op) {
		options[name] = op;
	};

	this.setCoulmns = function(name, column) {
		columns[name] = column;
	};

	this.setDataViewType = function(name, dataView) {
		dataViewType[name] = dataView;
	};

	this.$get = ['$log',function($log) {
		function _new (name, container, data, columns, options) {
			if(name === undefined) {
				throw new Error("grid name is undefined");
			}

			grids[name] = new egoVGrid(container, data, columns, options);
			return grids[name];
		}
		function _get (name) {
			var returnV = grids[name];
			if(returnV === undefined) $log.error('can`t find '+name);
			return returnV;
		}
		return {
			$new : _new,
			$get : _get

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