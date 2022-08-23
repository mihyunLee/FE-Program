# new Function 문법



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



## 1. 문법

- 함수 표현식과 함수 선언문 이외에 `new Function`을 사용하여 함수를 만들 수 있다.

```javascript
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<br>

- 함수는 인수 `arg1...argN`과 함수 본문 `functionBody`로 구성된다.

```javascript
// 인수가 두 개인 함수
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3

// 인수가 없고 본문만 있는 함수
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

<br>

- `new Function`을 사용해 함수를 만들면 런타임에 받은 문자열을 사용해 함수를 만들 수 있다

```javascript
let str = ... 서버에서 동적으로 전달받은 문자열(코드 형태) ...

let func = new Function(str);
func();
```

<br>

## 2. 클로저

-  `new Function`을 이용해 만든 함수는 외부 변수에 접근할 수 없고, 전역 변수에만 접근할 수 있다.
  - `[[Environment]]` 프로퍼티는 함수가 만들어진 렉시컬 환경을 참조한다.
    `new function`을 이용해 함수를 만들면 `[[Environment]]` 프로퍼티가 현재 렉시컬 환경이 아닌 전역 렉시컬 환경을 참조하므로 외부 변수를 사용할 수 없다.

```javascript
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // ReferenceError: value is not defined
```

- 스크립트가 프로덕션 서버에 반영되기 전 압축기에 의해 함수 내부에 있는 변수 이름이 짧은 이름으로 대체된다. 따라서 `new Function`으로 만든 함수 내부에서 외부 변수에 접근하려고 하면 해당 변수는 이름이 변경되었기 때문에 찾을 수 없게 된다.
- 함수 내부에서 외부 변수에 접근하는 것은 아키텍처 관점에서도 좋지 않고 에러에 취약하기 때문에 `인수`를 사용하는 것이 좋다.

