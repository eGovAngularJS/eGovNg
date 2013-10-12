angular.module('egov.ui.grid')
.factory('egovGridHelper',['egovGridFormatter',function(egovGridFormatter) {
	function _buildColumn (tableEl, $scope) {
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
					comboBoxData = tdEl.attr('comboBoxData') || null,
					cssClass = tdEl.attr('class') || null,
					asyncPostRender = tdEl.attr('async-post-render') || null;

			column.id = exp;
			column.field = exp;
			column.headerCssClass = exp;
			column.cssClass = cssClass;
			column.width =  width;
			column.resizable = resizable;
			column.sortable  = sortable;
			column.asyncPostRender = asyncPostRender;
			column.formatter = (formatter) ? egovGridFormatter.getFormatter(formatter) : null;

					// comboBoxData : comboBoxData,
					// formatter : formatter,
					// editMod : editMod,
					// editorType : editorType,

					// tdClickFunc : column.attr("ng-click"),
					
					// tdDblClickFunc : column.attr('ng-dblclick')

		});

		return columns;
	}

	function _rebuildColumnWidhScope(columns,$scope) {
		angular.forEach(columns, function(value, key){
			if(value.asyncPostRender){
				value.asyncPostRender = $scope.$parent[value.asyncPostRender];
			}
		});
	}
	return {
		buildColumn : _buildColumn,
		rebuildColumnWidhScope : _rebuildColumnWidhScope
	};
}]);