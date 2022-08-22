# 오래된 var



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



## 1. var는 블록 스코프가 없다.

`var`로 선언한 변수의 스코프는 **함수 스코프**이거나 **전역 스코프**이다.

블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근 가능하다. 오래전의 자바스크립트에선 블록 수준 렉시컬 환경이 만들어 지지 않았기 때문이다.

<br>

## 2. var는 변수의 중복 선언을 허용한다.

한 스코프에서 같은 변수를 `let`으로 두 번 선언하면 에러가 발생하지만, `var`로 중복 선언을 할 경우엔 첫 번째 선언을 제외한 선언문은 무시된다.

<br>

## 3. 선언하기 전 사용할 수 있는 var

전역에서 선언한 변수는 스크립트가 시작될 때 처리되지만, `var`선언은 **함수가 시작될 때** 처리된다. 

함수 본문 내에서 `var`로 선언한 변수는 선언 위치와 상관없이 함수 본문이 시작되는 지점에서 정의된다.

`var`로 선언한 모든 변수는 함수의 최상위로 끌어 올려지는데 이러한 현상을 `호이스팅`(hoisting)이라고 부른다.

<br>

### 선언은 호이스팅 되지만 할당은 호이스팅 되지 않는다.

```javascript
function sayHi() {
  alert(phrase);

  var phrase = "Hello";
}

sayHi();
```

- `var pharse = "Hello";`
  - 변수 선언(`var`)
  - 변수에 값을 할당(`=`)

변수 선언은 함수 실행이 시작될 때 처리되지만 할당은 호이스팅 되지 않기 때문에 아래 코드와 같이 동작한다.

```javascript
function sayHi() {
  var phrase; // 선언은 함수 시작 시 처리된다.

  alert(phrase); // undefined

  phrase = "Hello"; // 할당은 실행 흐름이 해당 코드에 도달했을 때 처리된다.
}

sayHi();
```

<br>

## 즉시 실행 함수 표현식

`var`가 블록 레벨 스코프를 가질 수 있도록 만들어진 것이 **즉시 실행 함수 표현식**(IIFE, immediately-invoked function expressions)이다.



1. 괄호를 사용하여 IIFE 만들기

```javascript
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

- 함수 표현식을 괄호로 둘러싸고, 호출하는 형태
- 괄호가 없으면 자바스크립트가 `function` 키워드를 함수 선언문으로 인식하기 때문에 반드시 함수 이름이 있어야한다.
- 함수 이름을 넣더라도 함수 정의와 호출을 동시에 할 수 없기 때문에 에러가 발생한다.

2 .  그 외

```javascript
(function() {
  alert("함수를 괄호로 둘러싸기");
})();

(function() {
  alert("전체를 괄호로 둘러싸기");
}());

!function() {
  alert("표현식 앞에 비트 NOT 연산자 붙이기");
}();

+function() {
  alert("표현식 앞에 단항 덧셈 연산자 붙이기");
}();
```



