# setTimeout과 setInterval을 이용한 호출 스케줄링



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



> 호출 스케줄링(scheduling a call)이란?

일정 시간이 지난 후에 원하는 함수를 예약 실행(호출)할 수 있게 하는 것.

`setTimeout`과 `setInterval`을 이용해 호출 스케줄링을 구현할 수 있다.

<br>

## 1. setTimeout

- 문법

```javascript
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

- 매개변수
  - `func|code` - 실행하고자 하는 코드로 **함수** 또는 **문자열** 형태이다. 대부분 함수가 들어가고, 문자열은 하위 호환성을 위해 남겨둔 것.
  - `delay` - 실행 전 대기시간으로, 단위는 밀리초(1000밀리초 = 1초)이며 기본값은 0이다.
  - `arg1`, `arg2` ... - 함수에 전달할 인수들로 IE9 이하에선 지원하지 않는다.
- 예시
  - 1초 뒤에 `sayHi()`가 호출된다.

```javascript
function sayHi(who, phrase) {
  alert( who + ' 님, ' + phrase );
}

setTimeout(sayHi, 1000, "홍길동", "안녕하세요."); // 홍길동 님, 안녕하세요.
```

- `setTimeout`의 첫 번째 인수가 문자열이면 자바스크립트는 이 문자열을 이용해 함수를 만든다. 하지만 되도록 함수를 넘기거나, 익명 화살표 함수를 사용하는 것이 좋다.
- `setTimeout`은 함수의 참조 값을 받도록 되어있다. 따라서 함수 뒤에 `()`를 붙여 `sayHi()`처럼 함수를 인수로 전달하면 **함수 실행 결과**가 전달된다. 하지만 `sayHi()`에는 반환문이 없어 호출 결과가`undefined`가 되기 때문에 코드가 제대로 동작하지 않는다.

<br>

## 2. clearTimeout으로 스케줄링 취소하기

- `setTimeout`을 호출하면 **타이머 식별자**(timer identifier)가 반환된다. 스케줄링을 취소할 땐 이 식별자를 사용한다.
- 브라우저 환경에선 타이머 식별자가 숫자이다. 참고로 Node.js에서는 타이머 객체를 반환한다.
- 아래 코드에서는 스케줄링이 취소되었기 때문에 메시지가 아닌 타이머 식별자가 출력된다.

```javascript
let timerId = setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 1000);
alert(timerId); // 타이머 식별자

clearTimeout(timerId);
alert(timerId); // 위 타이머 식별자와 동일함
```

<br>

## 3. setInterval

- 문법

```javascript
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

-  `setTimeout` 은 함수를 한 번만 실행하지만 `setInterval`은 함수를 주기적으로 실행한다.

-  함수 호출을 중단하려면 `clearInterval(timerid)`을 사용한다.

```javascript
// 2초 간격으로 메시지를 보여줌
let timerId = setInterval(() => alert('째깍'), 2000);

// 5초 후에 정지
setTimeout(() => { clearInterval(timerId); alert('정지'); }, 5000);
```

- 대부분의 브라우저는 `alert/confirm/prompt` 창이 떠 있는 동안에도 내부 타이머를 멈추지 않는다.

<br>

## 4. 중첩 setTimeout

- 일정 간격을 두고 무언가를 실행할 때, `setInterval`외에 중첩 `setTimeout`을 이용할 수 있다.

```javascript
/*
let timerId = setInterval(() => alert('째깍'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('째깍');
  timerId = setTimeout(tick, 2000);
}, 2000);
```

- 중첩 `setTimeout`은 호출 결과에 따라 다음 호출을 원하는 방식으로 조정해 스케줄링 할 수 있어서 `setInterval`보다 유연하게 동작한다.

  - 서버가 과부하 상태일 때 요청 간격을 증가시켜주는 예시 코드

  ```javascript
  let delay = 5000;
  
  let timerId = setTimeout(function request() {
    ...요청 보내기...
  
    if (서버 과부하로 인한 요청 실패) {
      // 요청 간격을 늘린다.
      delay *= 2;
    }
  
    timerId = setTimeout(request, delay);
  
  }, delay);
  ```

- `setInterval`을 사용하면 함수를 실행하는 데 소모되는 시간도 지연 간격에 포함시키기 때문에 **지연 간격을 보장**하기 위해선 중첩 `setTimeout`을 사용하는 것이 좋다.

  - `setInterval`

  ![image-20220823164613487](https://user-images.githubusercontent.com/51310674/186104527-de8f9857-f639-4986-b202-9343ed78ba78.png))

  - 중첩 `setTimeout`

  ![image-20220823164637159](https://user-images.githubusercontent.com/51310674/186104547-2795b1f4-fa4b-42fb-ace4-c6048179fea4.png)

<br>

### 가비지 컬렉션과 setInterval / setTimeout

`setInterval`이나 `setTimeout`에 함수를 넘기면, 함수에 대한 내부 참조가 새롭게 만들어지고 이 참조 정보는 스케줄러에 저장된다. 따라서 넘겨진 함수는 가비지 컬렉션의 대상이 되지 않는다.

`setInterval`의 경우는, `clearInterval`이 호출되기 전까지 함수에 대한 참조가 메모리에 유지된다.

<br>

## 5. 대기 시간이 0인 setTimeout

`setTimeout`의 대기 시간을 0으로 설정하면 `func`을 가능한 한 빨리 실행할 수 있다. 다만, 이때 스케줄러는 현재 실행 중인 스크립트의 처리가 종료된 이후에 스케줄링한 함수를 실행한다.

이런 특징을 이용하면 현재 스크립트의 실행이 종료된 **직후에** 원하는 함수가 실행될 수 있게 할 수 있다.

```javascript
// 출력 순서 : Hello -> World
setTimeout(() => alert("World"));

alert("Hello");
```
