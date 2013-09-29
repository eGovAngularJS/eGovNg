/**
 * @license JCF-UI  v0.0.1
 * (c) 2010-2013 Daewoo Information System, Inc.
 * License: MIT
 *
 */
(function(window, angular, undefined) {
'use strict';

var directive = {};
var service = { value: {} };

directive.treeElement = ['$compile', function($compile) {
    return {
        restrict: 'A', //Element
        link: function (scope, element, attrs)
        {
            //작업 트리를 현재 노드로 갱신
			scope.tree = scope.node;
			
			//하부 요소 숨기기|보이기 설정
			var visibility = ( attrs.nodeState != "collapse" ) || 'style="display: none;"';
								
			//하위 요소가 존재할 경우
			if( scope.tree.children.length )
			{
				for(var i in scope.tree.children)
				{					
					//하위 요소가 존재하면,
					if( scope.tree.children[i].children.length )
					{
						scope.tree.children[i].className = "jcf_" + attrs.nodeState;
					}
					else
					{
						scope.tree.children[i].className = "jcf_child";
					}
					
					//현재 작업중인 노드이면,
					if(scope.selectedNode == scope.tree.children[i][attrs.nodeId])
					{
						scope.tree.children[i].className += " jcf_selected";
					}					
					else
					{
						scope.tree.children[i].className += " jcf_deselected";
					}
				}
				
				//하위 요소 등록
				//1단계 : 임의의 HTML 내용을 적용시키기 위해 먼저 HTML을 DOM 요소로 파싱한다.
				var template = angular.element('<ul ' + visibility + '><li ng-repeat="node in tree.children" node-id={{node.' + attrs.nodeId + '}} ng-class="node.className"><span>{{node.' + attrs.nodeName + '}}</span><div tree-element tree="node" node-id=' + attrs.nodeId + ' node-name=' + attrs.nodeName + ' node-state=' + attrs.nodeState + '></div></li></ul>');
				
				//2단계: 템플릿을 컴파일한다.
				var linkFunction = $compile(template);

				//3단계: 스코프를 컴파일한 템플릿과 연결한다.
				linkFunction(scope);

				//4단계: HTML 요소를 반영한다.
				element.replaceWith( template );
			}
			else
			{
				//하위 요소가 없으면 제거
				element.remove();
			}
        }
     };
}];
directive.jcfTree = ['$compile', function($compile) {
    return {
        restrict: 'A', //Element
        link: function (scope, element, attrs) {
            //선택된 노드
			scope.selectedNode = null;
			
			scope.$watch( attrs.treeData, function(val)
			{
				for(var i in scope[attrs.treeData])
				{
					//하위 요소가 존재하면,
					if( scope[attrs.treeData][i].children.length )
					{
						scope[attrs.treeData][i].className = "jcf_" + attrs.nodeState;
					}
					else
					{
						scope[attrs.treeData][i].className = "jcf_child";
					}
					
					//현재 작업중인 노드이면,
					if(scope.selectedNode == scope[attrs.treeData][i][attrs.nodeId])
					{
						scope[attrs.treeData][i].className += " jcf_selected";
					}					
					else
					{
						scope[attrs.treeData][i].className += " jcf_deselected";
					}
				}
				
				//1단계 : 임의의 HTML 내용을 적용시키기 위해 먼저 HTML을 DOM 요소로 파싱한다.
				var template = angular.element('<ul id="' + attrs.treeId + '" class="filetree treeview-famfamfam treeview"><li ng-repeat="node in ' + attrs.treeData + '" node-id={{node.' + attrs.nodeId + '}} ng-class="node.className"><span>{{node.' + attrs.nodeName + '}}</span><div tree-element tree="node" node-id=' + attrs.nodeId + ' node-name=' + attrs.nodeName + ' node-state=' + attrs.nodeState + '></div></li></ul>');
				
				//2단계: 템플릿을 컴파일한다.
				var linkFunction = $compile(template);

				//3단계: 스코프를 컴파일한 템플릿과 연결한다.
				linkFunction(scope);
				
				//4단계: HTML 요소를 반영한다.
				element.html(null).append( template );
				
				
				
				//노드 클릭 이벤트 설정
				$('#' + attrs.treeId).unbind().bind('click', function(e)
				{
					//기존 컨텍스트 메뉴 제거
					angular.element(document.getElementById(attrs.treeId + 'ContextMenu')).remove();
					
					//트리 내용을 선택했을 경우
					if( e.target.tagName.toLowerCase() == "span" )
					{
						//가장 가까운 LI 선택
						var selectedNode = $(e.target).closest('li');

						//서브 메뉴가 정확히 선택된 경우에만!
						if(selectedNode.length)
						{
							//처음 선택한 경우에만,
							if( $(selectedNode).hasClass('jcf_deselected') )
							{
								//선택한 노드 저장
								scope.selectedNode = $(selectedNode).attr('node-id');
								
								//선택한 노드 브로드캐스팅
								scope.$broadcast('nodeSelected', { selectedNode: $(selectedNode).attr('node-id') });
								
								//선택한 노드만 굵게
								$('.jcf_selected').addClass("jcf_deselected").removeClass("jcf_selected");
								$(selectedNode).addClass("jcf_selected").removeClass("jcf_deselected");	
							}
							//이미 선택한 경우엔,
							else
							{
								//더블 클릭으로 인식해서 수정모드로 갈까?
							}
						}
					}
					
					//내용 이외에 트리를 선택했을 경우
					if( e.target.tagName.toLowerCase() == "li" )
					{
						//가장 가까운 LI 선택
						var selectedNode = $(e.target).closest('li');
						
						//서브 메뉴가 정확히 선택된 경우에만!
						if(selectedNode.length)
						{
							//자식 노드가 있으면,
							if( $(selectedNode).children('ul').length )
							{
								//자식 노드 토글
								$(selectedNode).children('ul').slideToggle("fast");
							
								//아이콘 토글
								if( $(selectedNode).hasClass("jcf_collapse") )
								{
									$(selectedNode).removeClass("jcf_collapse");
									$(selectedNode).addClass("jcf_expand");
								}
								else
								{
									$(selectedNode).removeClass("jcf_expand");
									$(selectedNode).addClass("jcf_collapse");
								}
							}
						}
					}

				});


				if(attrs.contextMenu == "true")
				{
					$('#' + attrs.treeId).unbind('contextmenu').bind('contextmenu', function(e)
					{
						console.log(e.target);
						
						//트리 내용을 선택했을 경우
						if( e.target.tagName.toLowerCase() == "span" )
						{
							//가장 가까운 LI 선택
							var selectedNode = $(e.target).closest('li');

							//서브 메뉴가 정확히 선택된 경우에만!
							if(selectedNode.length)
							{
								//처음 선택한 경우에만,
								if( scope.selectedNode != $(selectedNode).attr('node-id') )
								{
									//선택한 노드 저장
									scope.selectedNode = $(selectedNode).attr('node-id');
									
									//선택한 노드 브로드캐스팅
									scope.$broadcast('nodeSelected', { selectedNode: $(selectedNode).attr('node-id') });
									
									//선택한 노드만 굵게
									$('.jcf_selected').addClass("jcf_deselected").removeClass("jcf_selected");
									$(selectedNode).addClass("jcf_selected").removeClass("jcf_deselected");	
								}
								
								//기존 컨텍스트 메뉴 제거
								angular.element(document.getElementById(attrs.treeId + 'ContextMenu')).remove();
								
								//Context 메뉴를 위한 객체 생성
								var contextMenu = document.createElement('div');
								contextMenu.innerHTML = '<ul><li class="add">추가</li><li class="modify">수정</li><li class="remove">삭제</li></ul>'; 
								contextMenu.setAttribute("id", attrs.treeId + 'ContextMenu');
								contextMenu.setAttribute("style", "top:" + (e.pageY-2) + "px; left:" + (e.pageX-2) + "px;");
								contextMenu.className = "jcf-tree-menu";
								document.body.appendChild(contextMenu);
								
								angular.element(document.getElementById(attrs.treeId + 'ContextMenu')).unbind('click').bind('click', function(e)
								{
									//컨텍스트 메뉴 내용을 선택했을 경우
									if( e.target.tagName.toLowerCase() == "li" )
									{
										switch( e.target.innerText )
										{
											case "추가":
												scope[attrs.addMenuCallback]();
												scope.$apply(); //역시 화면에 바로 적용이 안될땐 apply!!
											break;
											
											case "수정":
												scope[attrs.modifyMenuCallback]();
												scope.$apply(); //역시 화면에 바로 적용이 안될땐 apply!!
											break;
											
											case "삭제":
												scope[attrs.deleteMenuCallback]();
												scope.$apply(); //역시 화면에 바로 적용이 안될땐 apply!!
											break;
										}
									}
									
									//컨텍스트 메뉴 제거
									angular.element(document.getElementById(attrs.treeId + 'ContextMenu')).remove();
								});
								
								angular.element(document.getElementById(attrs.treeId + 'ContextMenu')).unbind('mouseout').bind('mouseout', function(e)
								{
									//컨텍스트 메뉴에서 벗어나면,
									if( e.fromElement.tagName.toLowerCase() == "li" &&
										e.fromElement.parentElement != e.toElement.parentElement )
									{
										//컨텍스트 메뉴 제거
										angular.element(document.getElementById(attrs.treeId + 'ContextMenu')).remove();
									}
								});
							}
						}
						
						return false; //시스템 컨텍스트 메뉴 출력 안함
					});
				}
				

			}, true ); //true - 실제 값의 변화를 추적 | false - 주소값의 변화를 추적
        }
    };
}];


var jcfNew = angular.module('jcf.etc', []).directive(directive).factory(service);


})(window, window.angular);

