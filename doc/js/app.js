//requireJS 모듈 선언 - [myApp 앵귤러 모듈]
define([
		'angular', //앵귤러 모듈을 사용하기 위해 임포트
		'library/jcf/dynamicView'
	],
	
/*
	이 부분도 주의깊게 살펴봐야한다.
	위의 디펜던시들이 모두 로드된 뒤에 아래의 콜백이 실행된다.
	디펜던시들이 리턴하는 객체들을 콜백함수의 파라메터로 받게 되는데,
	자세히보면 route-config와 같이 snake case로 된 파일명이,
	파라메터로 받을 때는 routeConfig와 같이 camel case로 바뀌는 것을 볼 수 있다.
*/
	//디펜던시 로드뒤 콜백함수
	function (angular) {
	
		//위의 디펜던시를 가져와서 콜백을 수행하게 되는데,
		//리턴하는 내용이 실제 사용되는 부분이겠지?
		//여기서는 myApp이라는 앵귤러 모듈을 리턴한다.
		
		
		//모듈 선언
		var app = angular.module('myApp', ['bootstrapPrettify', 'ui.bootstrap', 'jcf.dv']);
			
		//기본 경로
		app.value('defaultPath', '/');
		
		//최상위 트리
		app.value('rootNodeId', 'root');


		//로케이션 프로바이더 설정
		app.config(function($locationProvider) {
			//hashbang 사용 
			//http://docs.angularjs.org/guide/dev_guide.services.$location
			//HTML5 mode 는 HTML5 History API 를 사용함. hashbang을 쓰면 #도..
			$locationProvider.html5Mode(false).hashPrefix('!');
		});

	
		//상단 메뉴 다이렉티브 등록
		app.directive('navbarMenu', function($compile) {
			return {
				restrict: 'A', //Attribute(속성)
				link: function (scope, element, attrs) {
					//메뉴트리 재귀호출 메서드
					function menuElement(children) {
						var elementData = '<ul class="dropdown-menu">';
						
						for(var i=0; i<children.length; i++) {
						
	/* 					
							//하부 요소가 존재하면,
							if(children[i].children.length)
							{
								elementData +=
									'<li class="dropdown-submenu">' +
										'<a href="' +  children[i].viewResourceHurl + '">' + children[i].viewResourceName + '</a>' +
										menuElement(children[i].children) +
									'</li>';
							}
							else
							{
								elementData +=
									'<li><a href="' +  children[i].viewResourceHurl + '">' + children[i].viewResourceName + '</a></li>';
							}
	*/
							elementData +=
								'<li><a href="' +  children[i].viewResourceHurl + '">' + children[i].viewResourceName + '</a></li>';	
						}
						
						elementData += '</ul>';
						
						return elementData;
					}
					
					
					//메뉴 데이터가 변경되면,
					scope.$watch('menuTree', function(val) {
						var elementData = '<ul class="nav topnav">';
						
						if(angular.isArray(scope.menuTree)) {
							for(var i=0; i<scope.menuTree.length; i++) {
								//하부 요소가 존재하면,
								if(scope.menuTree[i].children.length) {
									elementData +=
										'<li class="dropdown">' +
											'<a href="#" data-toggle="dropdown" class="dropdown-toggle top-level-menu">' +
												scope.menuTree[i].viewResourceName + '　<b class="caret"></b>' +
											'</a>' +
											menuElement(scope.menuTree[i].children) +
										'</li>';
								}
								else {
									elementData +=
										'<li><a href="' + scope.menuTree[i].viewResourceHurl + '" class="top-level-menu">' + scope.menuTree[i].viewResourceName + '</a></li>';
								}
							}
							
							elementData += '</ul>';
			 
							//1단계 : 임의의 HTML 내용을 적용시키기 위해 먼저 HTML을 DOM 요소로 파싱한다.
							var template = angular.element(elementData);
			 
							//2단계: 템플릿을 컴파일한다.
							var linkFunction = $compile(template);
							  
							//3단계: 스코프를 컴파일한 템플릿과 연결한다.
							linkFunction(scope);
			 
							//4단계: HTML 요소를 반영한다.
							element.html('').append( template );
						}
					}, true ); //true - 실제 값의 변화를 추적 | false - 주소값의 변화를 추적
				}
			};
		});

		
		//아코디언 메뉴 다이렉티브 등록
		app.directive('accordionMenu', function($compile) {
			return {
				restrict: 'A', //Attribute(속성)
				link: function (scope, element, attrs) {

					//parent-node 속성이 선언되어 있는 경우에만,
					if( angular.isDefined(attrs.parentNode) ) {
					
						//서브 메뉴 데이터 가져오기
						var sectionNode = scope.getTreeNode(scope.menuTree, attrs.parentNode);
							
						//서브메뉴 데이터 설정
						scope.menuList = sectionNode.children;
						
						//현재 활성화시킬 메뉴 설정
						if(attrs.parentNode == scope.currentNode.viewResourceId) {
							scope.expandedMenuId = scope.menuList[0].viewResourceId;
						}
						else {
							scope.expandedMenuId = scope.currentNode.parentViewId;
						}
						
						//collapsed 클래스 설정
						scope._collapsed = function(menu) {

							return {
								"collapsed": (menu.viewResourceId != scope.expandedMenuId)
							};
						};
						
						//in 클래스 설정
						scope._in = function(menu) {
							
							return {
								"in": (menu.viewResourceId == scope.expandedMenuId)
							};
						};
						
						//active 클래스 설정
						scope._activated = function(menu) {
						
							return {
								"active": (menu.viewResourceId == scope.currentNode.viewResourceId)
							};
						};
						
						//출력할 HTML 포맷
						var elementData = 
							'<div class="accordion affix-top" id="accordion">' +
								'<div class="accordion-group" ng-repeat="menu in menuList" >' +
									'<div class="accordion-heading">' +
										'<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#{{menu.viewResourceId}}" ng-class="_collapsed(menu)">' +
											'{{menu.viewResourceName}}' +
										'</a>' +
									'</div>' +
									'<div id="{{menu.viewResourceId}}" class="accordion-body collapse" ng-class="_in(menu)">' +
										'<div class="accordion-inner">' +
											'<div class="nav nav-list bs-docs-sidenav">' +
												'<li ng-repeat="child in menu.children" ng-class="_activated(child)">' +
													'<a href="./{{child.viewResourceHurl}}">' +
														'<i class="icon-chevron-right"></i>{{child.viewResourceName}}' +
													'</a>' +
												'</li>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';	

						//1단계 : 임의의 HTML 내용을 적용시키기 위해 먼저 HTML을 DOM 요소로 파싱한다.
						var template = angular.element(elementData);
		 
						//2단계: 템플릿을 컴파일한다.
						var linkFunction = $compile(template);
						  
						//3단계: 스코프를 컴파일한 템플릿과 연결한다.
						linkFunction(scope);
		 
						//4단계: HTML 요소를 반영한다.
						element.html('').append( template );
						
						//사이드바 고정
						$('#accordion').affix({
							offset: {
								top: 50,
								bottom: 0
							}
						});
						
					}
				}
			};
		});

		
		//리스트 메뉴 다이렉티브 등록
		app.directive('listMenu', function($compile) {
			return {
				restrict: 'A', //Attribute(속성)
				link: function (scope, element, attrs) {

					//parent-node 속성이 선언되어 있는 경우에만,
					if( angular.isDefined(attrs.parentNode) ) {
					
						//서브 메뉴 데이터 가져오기
						var sectionNode = scope.getTreeNode(scope.menuTree, attrs.parentNode);
							
						//서브메뉴 데이터 설정
						scope.menuList = sectionNode.children;

						//현재 노드 설정
						scope._activated = function(menu) {
						
							return {
								"active": (menu.viewResourceId == scope.currentNode.viewResourceId)
							};
						};
						var elementData = 
							'<div class="accordion affix-top" id="accordion">' +
								'<div class="accordion-group">' +
									'<div class="accordion-heading">' +
										'<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#' + sectionNode.viewResourceId + '">' +
											sectionNode.viewResourceName +
										'</a>' +
									'</div>' +
									'<div id="' + sectionNode.viewResourceId + '" class="accordion-body in collapse">' +
										'<div class="accordion-inner">' +
											'<div class="nav nav-list bs-docs-sidenav">' +
												'<li ng-repeat="menu in menuList" ng-class="_activated(menu)">' +
													'<a href="./{{menu.viewResourceHurl}}">' +
														'<i class="icon-chevron-right"></i>{{menu.viewResourceName}}' +
													'</a>' +
												'</li>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';	
							
						//1단계 : 임의의 HTML 내용을 적용시키기 위해 먼저 HTML을 DOM 요소로 파싱한다.
						var template = angular.element(elementData);
		 
						//2단계: 템플릿을 컴파일한다.
						var linkFunction = $compile(template);
						  
						//3단계: 스코프를 컴파일한 템플릿과 연결한다.
						linkFunction(scope);
		 
						//4단계: HTML 요소를 반영한다.
						element.html('').append( template );
						
						//사이드바 고정
						$('#accordion').affix({
							offset: {
								top: 50,
								bottom: 0
							}
						});
						
					}
				}
			};
		});
		
/*
		//디스커스 다이렉티브 등록
		app.directive('disqusThread', function($compile, defaultPath)
		{
			return {
				restrict: 'A', //Attribute(속성)
				link: function (scope, element, attrs) {

					var elementData = '<div id="disqus_thread"></div>';

					//1단계 : 임의의 HTML 내용을 적용시키기 위해 먼저 HTML을 DOM 요소로 파싱한다.
					var template = angular.element(elementData);
	 
					//2단계: 템플릿을 컴파일한다.
					var linkFunction = $compile(template);
					  
					//3단계: 스코프를 컴파일한 템플릿과 연결한다.
					linkFunction(scope);
	 
					//4단계: HTML 요소를 반영한다.
					element.replaceWith( template );
					
					//이미 embed.js 파일이 로드되어 있다면,
					if (window.DISQUS) {
						
						//DISQUS 리셋
						DISQUS.reset({
							reload: true,
							config: function () {
								this.page.identifier = scope.currentNode.viewResourceId;
								this.page.title = scope.currentNode.viewResourceName;
								this.page.url = defaultPath + "#!/" + scope.currentNode.viewResourceId;
							}
						});
					}
					
					//아직 embed.js 파일이 로드되어 있지 않다면,
					else {
					
						//disqus 파라메터 설정
						window.disqus_shortname = 'jcfuiframework';
						window.disqus_identifier = scope.currentNode.viewResourceId;
						window.disqus_title = scope.currentNode.viewResourceName;
						window.disqus_url = defaultPath + "#!/" + scope.currentNode.viewResourceId;

						//스크립트 엘리먼트 준비
						var dsq = document.createElement('script');
							dsq.type = 'text/javascript'; 
							dsq.async = true;
							dsq.src = 'http://jcfuiframework.disqus.com/embed.js';
						
						//스크립트 추가
						(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
					}
					
				}
			};
		});
*/		
				
		
		//공통 컨트롤러 설정 - 모든 컨트롤러에서 공통적으로 사용하는 부분들 선언
		app.controller('CommonController', function($scope, $route, $http, $location, $timeout, $rootScope, defaultPath, rootNodeId ) {

			
			//AJAX 통신 공용 메서드
			$scope.accessData = function(_method, _url, _data, _success, _error) {
				$http({
					method: _method, //방식
					url: _url, //통신할 URL
					data: _data, //파라메터로 보낼 데이터
					headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
				}).success(function(data, status, headers, config) {
					//서버와의 연결이 정상적일 때 처리
					if( _success ) {
						_success(data);
					}
				}).error(function(data, status, headers, config) {
					//서버와의 연결이 정상적이지 않을 때 처리
					if( _error ) {
						_error(status);
					}
				});		
			};


			
			
			//특정 노드 추출 함수
			$scope.getTreeNode = function ( _children, _id, _result ) {
 
			    //전체 리스트를 탐색
			    for ( var i=0, child; child = _children[i]; i++ ) {
			 
			        //노드를 찾았으면,
			        if ( child.viewResourceId === _id ) {
			 
			            //결과값 리턴
			            return child;
			        }
			 
			        //찾는 노드가 아니면,
			        else {
			 
			            //자식 노드들를 탐색
			            _result = arguments.callee( child.children, _id ) || _result;
			        }
			    }
			 
			    return _result;
			};


			
			//스타일시트 업데이트
			 $scope.$on('updateCSS', function(event, args) {
			 
				//파라메터로 받아온 스타일 시트 반영
				$scope.stylesheets = args;
			});  			
			

			
			//트리 생성 함수
			$scope.createResourceTree = function(data, root) {
				//최종적인 트리 데이터
				var _menuTree = [];
				
				//재귀 호출
				function checkChildNode(list, obj, i) {
					for(var j=0; j<list.length; j++) {
						if(list[j].viewResourceId == obj.viewResource.parentViewId) {
							//경로 업데이트
							var breadcrumb = angular.copy(list[j].breadcrumb);
								breadcrumb.push({ name: obj.viewResource.viewResourceName, url: obj.viewResource.viewResourceHurl });
							
							var view = {
								viewResourceId : obj.viewResource.viewResourceId,
								viewResourceName : obj.viewResource.viewResourceName,
								viewResourceSeq : obj.viewResource.viewResourceSeq,
								viewResourceUrl : obj.viewResource.viewResourceUrl,
								viewResourceHurl :obj.viewResource.viewResourceHurl,
								parentViewId : obj.viewResource.parentViewId,
								breadcrumb : breadcrumb,
								children : []
							};
							
							//현재 요소를 추가하고
							list[j].children.push(view);
							
							//데이터상에서는 삭제
							data.menuTree.splice(i, 1);
							
							//현재 트리 계층을 정렬
							list[j].children.sort(function(a, b) { 
								return a.viewResourceSeq < b.viewResourceSeq ? -1 : a.viewResourceSeq > b.viewResourceSeq ? 1 : 0;  
							});
							
							break;
						}
						else {
							if( list[j].children.length ) {
								checkChildNode(list[j].children, obj, i);
							}
						}
					}
				}
				
				//받아온 모든 메뉴 리소스에 대해 트리 구조 생성
				while(data.menuTree.length) {
					for(var i=0; i<data.menuTree.length; i++) {
						//부모ID가 rootNodeId 이면 최상위
						if( data.menuTree[i].viewResource.parentViewId == root ) {
							//최상위 객체면,
							var breadcrumb = [{ name: data.menuTree[i].viewResource.viewResourceName }];
							
							var view = {
								viewResourceId : data.menuTree[i].viewResource.viewResourceId,
								viewResourceName : data.menuTree[i].viewResource.viewResourceName,
								viewResourceSeq : data.menuTree[i].viewResource.viewResourceSeq,
								viewResourceUrl : data.menuTree[i].viewResource.viewResourceUrl,
								viewResourceHurl : data.menuTree[i].viewResource.viewResourceHurl,
								parentViewId : data.menuTree[i].viewResource.parentViewId,
								breadcrumb : breadcrumb,
								children : []
							};
							
							//현재 요소를 추가하고
							_menuTree.push(view);
							
							//데이터상에서는 삭제
							data.menuTree.splice(i, 1);
							
							//현재 트리 계층을 정렬
							_menuTree.sort(function(a, b) { 
								return a.viewResourceSeq < b.viewResourceSeq ? -1 : a.viewResourceSeq > b.viewResourceSeq ? 1 : 0;  
							});
													
							break;
						}
						else {
							checkChildNode(_menuTree, data.menuTree[i], i);
						}	
					}
				}
				
				//완성된 트리 리턴
				return _menuTree;
			}
		
		
		
			//메뉴 리소스들 AJAX로 가져오기
			$scope.accessData('GET', defaultPath + 'doc/docMenu.js', {},
			function(data) {
				if( angular.isArray(data.menuTree) ) {
			
					//메뉴 데이터 저장
					$scope.menuData = data.menuTree.slice();
				
					//메뉴 트리를 스코프에 할당
					$scope.menuTree = $scope.createResourceTree(data, rootNodeId);
					
					//경로 이동
					//$route.reload();
				}
				else {
					//통신한 URL에서 데이터가 넘어오지 않았을 때 처리
					//console.log('[데이터 통신에는 성공했으나 값이 넘어오지 않음 : 메뉴 데이터]');
				}
				
			},
			function(status) {
				//서버와의 연결이 정상적이지 않을 때 처리
				//console.log('[데이터 통신 실패 : 리소스 트리 리스트]');
				//console.log(status);
			});
			



			
			//주소값 변경시 브레드크럼 업데이트 및 컨텐츠 업데이트
			$scope.$watch( function() {
				//현재 주소를 리턴
				return $location.path(); 
			}, 

			function() {
				//아이디 추출
				var hash = $.trim($location.path().split('/')[1]) || 'home';

				var menuTreeCheck = function () {

					//트리가 생성된 경우에만,
					if(angular.isArray( $scope.menuTree )){

						//트리에서 노드 추출
						var node = $scope.getTreeNode($scope.menuTree, hash);
					
						//추출한 노드를 저장
						$scope.currentNode = node;
						
						//브레드크럼 업데이트
						$scope.breadcrumb = node.breadcrumb;

						//추출한 URL을 View에 출력
						$scope.currentPage =  {
							"url" : $scope.currentNode.viewResourceUrl
						};
					
					}

					else {
						//0.1초뒤 다시 체크
						$timeout(menuTreeCheck, 100);
					}
				}
				
				//타임 아웃 시작
				$timeout(menuTreeCheck, 0);
				
			}, true);

		});	
			
		
		return app; 
 	}
);
