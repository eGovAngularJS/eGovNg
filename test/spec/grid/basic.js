'use strict';

describe('Directive: GRID', function() {
  beforeEach(module('egov.ui.grid'));
 
	var element, scope, timeout;
 
	beforeEach(inject(function($rootScope, $compile, $timeout) {
		element = angular.element('<table egov-grid name="demoGrid" dataset="userList" \
       style="height:500px;"> \
      <thead> \
        <tr> \
          <th>이름</th> \
          <th>이메일</th> \
          <th>등록일</th> \
        </tr> \
      </thead> \
      <tbody> \
        <tr ng-repeat="user in userList"> \
          <td>{{name}}</td> \
          <td>{{email}}</td> \
          <td>{{regDate}}</td> \
        </tr> \
      </tbody> \
    </table>');
 
		scope = $rootScope;

		timeout = $timeout;
 
		scope.userList = [];
		for (var i = 0; i < 10; i++) {
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
		expect(list.length).toBe(10);
	});

	it("테이블 정보를 가지고 Column 정보를 만들어 낸다.",function() {
		var _gridDomParser,
				trElement = angular.element('<table><thead> \
		        <tr> \
		          <th>이름</th> \
		          <th>이메일</th> \
		          <th>등록일</th> \
		        </tr> \
		      </thead> \
		      <tbody> \
		        <tr> \
		          <td>{{name}}</td> \
		          <td>{{email}}</td> \
		          <td>{{regDate}}</td> \
		        </tr> \
		      </tbody></table>'),
				expectedObj = [{name: '이름', id: 'name', field: 'name', headerCssClass: 'name', width: 100, resizable: false, sortable: false},
				 {name: '이메일', id: 'email', field: 'email', headerCssClass: 'email', width: 100, resizable: false, sortable: false}, 
				 {name: '등록일', id: 'regDate', field: 'regDate', headerCssClass: 'regDate', width: 100, resizable: false, sortable: false}];
		
		inject(function(gridDomParser) {
			_gridDomParser = gridDomParser
		});

		expect(_gridDomParser.buildColumn(trElement)).toEqual(expectedObj);
	});

});