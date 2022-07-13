# nullish 병합 연산자 '??'



> 출처 - [**모던 JS 튜토리얼**](**https://ko.javascript.info/**) 을 보고 정리한 글입니다.



<br>



nullish 병합 연산자(nullish coalescing operator) `??`를 사용하면 확정되어있는 변수를 찾을 수 있다.

- `a ?? b` 는 아래와 같은 값을 반환한다.
  - `a`가 `null`도 아니고 `undefined`도 아니면 `a`
  - 그 외의 경우는 `b`

- `x = a ?? b`와 동일한 코드

```javascript
x = (a !== null && a !== undefined) ? a : b;
```

<br>


```javascript
let firstName = null;
let lastName = null;
let nickName = "바이올렛";

// null이나 undefined가 아닌 첫 번째 피연산자
alert(firstName ?? lastName ?? nickName ?? "익명의 사용자"); // 바이올렛
```

만약, 세 변수 모두 `undefined`나 `null`이었다면 바이올렛이 아닌 `익명의 사용자`가 출력된다.

<br>


## 1. `??`와 `||` 의 차이

- `||`는 첫 번째 *truthy* 값을 반환한다.
- `??`는 첫 번째 *정의된(defined)* 값을 반환한다.

- `null`과 `undefined`, 숫자 `0`을 구분 지어 다뤄야 할 때 차이를 보여준다.

<br>


```javascript
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` 은 `height`에 할당된 `0`이 falsy 한 값이기 때문에 100을 반환한다.

- `height ?? 100 `은 `height`가 `undefined`나 `null`이 아닌 `0`이 할당되었기 때문에 할당된 값인 `0`을 반환한다.

<br>


## 2. 연산자 우선순위

`??`의 우선순위는 5로 꽤 낮기 때문에 `=`나  `?` 보다는 먼저, 대부분의 연산자보다는 나중에 평가된다.

따라서 복잡한 표현식 안에서는 괄호를 추가해주는 것이 좋다.

```javascript
let height = null;
let width = null;

// 괄호 추가
let area1 = (height ?? 100) * (width ?? 50);

// 괄호를 추가하지 않을 경우의 계산식
let area2 = height ?? (100 * width) ?? 50;

alert(area1); // 5000
alert(area2); // 0
```

<br>


### ⚠ `??`는 `&&`나 `||`와 함께 사용하지 못한다.

`||`를 `??`로 바꾸기 시작하면서 만드는 실수를 방지하고자 명세서에 제약이 추가ㅚ었다.

제약을 피하기 위해서는 괄호를 사용하면 된다.

```javascript
let x = 1 && 2 ?? 3; // SyntaxError: Unexpected token '??'
let y = (1 && 2) ?? 3; // 제대로 동작한다.

alert(y); // 2

```