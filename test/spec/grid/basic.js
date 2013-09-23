'use strict';

describe('Directive: GRID', function() {
  beforeEach(module('egov.ui.grid'));
 
	var element, scope, timeout;
 
	beforeEach(inject(function($rootScope, $compile, $timeout) {
		element = angular.element('<div egov-grid style="width:600px;height:500px;" dataset="userList"></div>');
 
		scope = $rootScope;

		timeout = $timeout;
 
		scope.userList = [];
		for (var i = 0; i < 30; i++) {
			scope.userList.push({
				id : i,
				name : "jeado"+i,
				email : "haibane"+i+"@gmail.com",
				regdate : "20130910"
			});
		};
 
		$compile(element)(scope);
		scope.$digest();
	}));
 
	it("30개의 그리드의 로우가 그려져야 된다.", function() {
		var list = $(element).find('.slick-viewport .ui-widget-content.slick-row');
		expect(list.length).toBe(30);
	});

	// iit("2개를 추가하면 추가된 로우가 그려져야 된다.", function() {
	// 	for (var i = 30; i < 32; i++) {
	// 		scope.userList.push({
	// 			id : i,
	// 			name : "jeado"+i,
	// 			email : "haibane"+i+"@gmail.com",
	// 			regdate : "20130910"
	// 		});
	// 	};
		
	// 	scope.$apply();

	// 	var list = $(element).find('.slick-viewport .ui-widget-content.slick-row');
	// 	expect(list.length).toBe(32);
	// });
});