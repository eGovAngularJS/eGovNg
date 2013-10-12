angular.module('egov.ui.grid').provider('egovGrid', [function () {
	var grids = {},
			defaultOption;

	this.setOptions = function(op) {
		defaultOption = op;
	};

	//eGogGrid 선언
	function egoVGrid(container, data, columns, options) {
		Slick.Grid.apply(this, [container, data, columns, options]);
	}
	
	//SlickGrid의 모든 메소드 상속
	jQuery.extend(true, egoVGrid.prototype, Slick.Grid.prototype);
	egoVGrid.prototype.constructor = egoVGrid;

	this.$get = ['$log','egovGridFormatter',function($log,egovGridFormatter) {
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