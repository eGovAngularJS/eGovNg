eGov AngularJS Project
=========================== 

기존 전자정부 프레임워크에서 Front-End 즉 Presentain Layer에서 부족하다고 생각하는 UI 프레임워크를 위해 제공되는 프로젝트이다. AngularJS를 기반으로 하여 3rd-party UI 컴포넌트를 감싸는 `AngularJS 지시자(Directive)`를 제공하고 전자정부 프레임워크와 호환성을 위한 다양한 서비스와 실제 프로젝트에서 많이 요구되는 컴포넌트들을 제공한다.

## 설치방법

### 프레임워크 소스 빌드

```sh
sudo npm install -g grunt-cli karma bower //window사용자 sudo 필요없음
npm install
bower install
grunt build
```

### 프레임워크 적용

```js
<script type="text/javascript" src="path/eGovNg.js"></script>
```

### 가이드 사이트 오픈

```sh
grunt doc
```

## 변경 이력

- 0.0.1
	- 프로젝트 셋업
