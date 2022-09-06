# 'try..catch'와 에러 핸들링



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



에러가 발생하면 스크립트는 즉시 중단되고, 콘솔에 에러가 출력된다.

이럴 때 `try..catch` 문법을 사용하면 스크립트가 죽는 걸 방지하고, 에러를 잡아서(catch) 그 상황에 맞는 동작을 부여할 수 있다.

<br>

## 1. try..catch 문법

```javascript
try{
    // 코드
} catch (err) {
    // 에러 핸들링
}
```

### 동작 알고리즘

1. `try {...}` 안의 코드 실행
2. 에러가 없다면 `try` 안의 마지막 줄까지 실행되고, `catch` 블록은 건너뛴다.
3. 에러가 있다면, `try` 안 코드의 실행이 중단되고, `catch(err)` 블록으로 제어 흐름이 넘어간다.
   변수 `err`는 무슨 일이 일어났는지에 대한 설명이 담긴 에러 객체를 포함한다.

<br>

### ⚠️ `try..catch`는 런타임 에러에만 동작한다.

`try..catch`는 **실행 가능한 코드**에만 동작한다. 

>  실행 가능한 코드 = 유효한 자바스크립트 코드

중괄호 짝이 안 맞는 것처럼 코드가 문법적으로 잘못된 경우엔 `try..catch`가 동작하지 않는다.

자바스크립트 엔진은 코드를 읽고 난 후 코드를 실행하는데, 코드를 읽는 중에 발생하는 에러를 **parse-time 에러**라고 부른다. 엔진은 이 코드를 이해할 수 없기 떄문에 parse-time 에러는 코드 안에서 복구가 불가능하다.

유효한 코드에서 발생하는 에러를 **런타임 에러(runtime error)** 혹은 **예외(exception)**라고 부르며 `try..catch`는 이러한 에러만 처리할 수 있다.

<br>

### ⚠️ `try..catch`는 동기적으로 동작한다.

`setTimeout`처럼 **스케줄 된(scheduled) 코드**에서 발생한 예외는 `try..catch`에서 잡아낼 수 없다.

`setTimeout`에 넘겨진 익명 함수는 엔진이 `try..catch`를 떠난 다음에서야 실행되기 때문이다.

스케줄 된 함수 내부의 예외를 잡으려면, `try..catch`를 반드시 함수 내부에 구현해야 한다.

```javascript
// 에러 핸들링 불가
try {
  setTimeout(function() {
    noSuchVariable; // 스크립트는 여기서 죽는다.
  }, 1000);
} catch (e) {
  alert( "작동 멈춤" );
}

// 에러 핸들링 가능
setTimeout(function() {
  try {
    noSuchVariable;
  } catch {
    alert( "에러를 잡았습니다!" );
  }
}, 1000);
```

<br>

## 2. 에러 객체

- 에러가 발생하면 자바스크립트는 에러 상세내용이 담긴 객체를 생성
- `catch` 블록에 에러 객체를 인수로 전달

```javascript
try {
  // ...
} catch(err) { // err : 에러 객체, err 대신 다른 이름도 가능
  // ...
}
```

### 구성 프로퍼티

- `name`
  - 에러 이름
  - 정의되지 않은 변수 때문에 발생한 에러라면 `ReferenceError`가 이름이 된다.
- `message`
  - 에러 상세 내용을 담고 있는 문자 메시지
- `stack`
  - 비표준 프로퍼티
  - 현재 호출 스택을 의미한다.
  - 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열로 디버깅 목적으로 사용된다.

### 예시

```javascript
try {
  lalala; // 에러, 변수가 정의되지 않음
} catch(err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at ... (호출 스택)

  // 에러 전체를 보여줄 수도 있다
  // 이때, 에러 객체는 "name: message" 형태의 문자열로 변환된다.
  alert(err); // ReferenceError: lalala is not defined
}
```

<br>

## 3. 선택적 'catch' 바인딩

> 스펙에 추가된 지 얼마 안 된 문법이기 떄문에 구식 브라우저는 폴리필이 필요하다.

- 에러에 대한 자세한 정보가 필요하지 않다면, `catch`에서 이를 생략할 수 있다.

```javascript
try {
  // ...
} catch { // (err) 없이 쓸 수 있다.
  // ...
}
```

<br>

## 4. 직접 에러를 만들어서 던지기

```javascript
let json = '{ "age": 30 }'; // 불완전한 데이터

try {

  let user = JSON.parse(json);
  alert( user.name ); // undefined

} catch (e) {
  alert( "실행되지 않습니다." );
}
```

`JSON.parse`는 정상적으로 실행되었지만 `name`이 없는 건 에러를 유발하는 상황이 될 수 있다.

이 때 `throw` 연산자를 사용하여 에러 처리를 통합할 수 있다.

<br>

### 'throw' 연산자

#### 문법

```javascript
throw <error object>
```

- 숫자, 문자열 같은 원시형 자료를 포함한 어떤 것이든 **에러 객체**로 사용할 수 있다.

- 내장 에러와의 호환을 위해 되도록 에러 객체에 `name`과 `message` 프로퍼티를 넣어주는 것을 권장한다.

#### 에러 객체 관련 생성자

- `Error`
- `SyntaxError`
- `ReferenceError`
- `TypeError`

```javascript
let error = new Error(message);
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

내장 생성자를 사용해 만든 내장 에러 객체의 `name` 프로퍼티는 생성자 이름과 동일한 값을 갖는다.

프로퍼티 `message`의 값은 인수에서 가져온다.

```javascript
let error = new Error("이상한 일이 발생했습니다. o_O");

alert(error.name); // Error
alert(error.message); // 이상한 일이 발생했습니다. o_O
```

#### throw 연산자를 사용해 에러 던지기

```javascript
let json = '{ "age": 30 }'; // 불완전한 데이터

try {

  let user = JSON.parse(json); 

  if (!user.name) {
    throw new SyntaxError("불완전한 데이터: 이름 없음"); // SyntaxError 생성
  }

  alert( user.name ); // 동작 안 함

} catch(e) {
  alert( "JSON Error: " + e.message ); // JSON Error: 불완전한 데이터: 이름 없음
}
```

에러가 발생했기 때문에 `try`의 실행은 즉시 중단되고 제어 흐름이 `catch`로 넘어가서 `alert`이 실행된다.

<br>

## 5. 에러 다시 던지기

`throw`를 사용해서 에러 생성 후 `catch`로 잡게되면 `try` 블록에서 발생한 **모든 에러**를 `throw`로 생성한 에러만을 보여준다.

에러 종류와 관계없이 동일한 방식으로 에러를 처리하는 것은 디버깅을 어렵게 만들기 때문에 좋지 않다.

이런 문제를 피하고자 *다시 던지기(rethrowing)*를 사용한다. **catch는 알고 있는 에러만 처리하고 나머지는 다시 던져야 한다.**

### 방법

1. catch가 모든 에러를 받는다.
2. `catch(err) {...}` 블록 안에서 에러 객체 `err`를 분석한다.
3. 에러 처리 방법을 알지 못하면 `throw err`를 한다.

### instanceof 사용하기

```javascript
try {
  user = { /*...*/ };
} catch(err) {
  if (err instanceof ReferenceError) {
    alert('ReferenceError'); //  ReferenceError
  }
}
```

- `instanceof`

  - ```javascript
    object instanceof constructor
    ```

  - `object`의 프로토타입 체인에 `constructor.prototype`이 존재하는지 판별한다.

  - 보통 에러타입을 `instanceof` 명령어로 체크한다.

### 예시

````javascript
let json = '{ "age": 30 }'; // 불완전한 데이터
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("불완전한 데이터: 이름 없음");
  }

  blabla(); // 예상치 못한 에러

  alert( user.name );

} catch(e) {

  if (e instanceof SyntaxError) {
    alert( "JSON Error: " + e.message ); // SyntaxError 일 때만 alert 동작
  } else {
    throw e; // 에러 다시 던지기
  }

}
````

`catch` 블록 안의 다시 던져진 에러는 `try..catch` 밖으로 던져진다. 이때 바깥에 `try..catch`가 있다면 여기서 에러를 잡는다.

위 코드는 `catch` 블록에서 어떻게 다룰지 알고 있는 에러만 처리하고, 알 수 없는 에러는 건너뛸 수 있다.



### 다시 던져진 에러 처리

```javascript
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // 에러 발생
  } catch (e) {
    // ...
    if (!(e instanceof SyntaxError)) {
      throw e; // 알 수 없는 에러 다시 던지기
    }
  }
}

try {
  readData();
} catch (e) {
  alert( "External catch got: " + e ); // 에러 잡기
}
```

`readData`는 `SyntaxError`만 처리할 수 있지만, `SyntaxError`가 아닌 에러들을 다시 던지면

함수 바깥의 `try..catch`에서 예상치 못한 에러도 처리할 수 있게 된다.

<br>

## 6. try...catch...finally

```javascript
try {
    // 실행 코드
} catch(e) {
    // 에러 핸들링
} finally {
    // 항상 실행
}
```

### finally 안의 코드 실행 시점

- 에러가 없는 경우 - `try` 실행이 끝난 후
- 에러가 있는 경우 - `catch` 실행이 끝난 후

`finally` 절은 실행 결과에 상관없이 실행을 완료하고 싶을 경우 사용된다. 

<br>

## 7. 전역 catch

`try..catch` 외부에서 발생한 에러는 어떻게 잡을까?

자바스크립트 호스트 환경 대다수는 자체적으로 에러 처리 기능을 제공한다. Node.js의 `process.on("uncaughtException")`이나 브라우저 환경에선 `window.onerror`를 이용해서 처리할 수 있다.

### 문법

```javascript
window.onerror = function(message, url, line, col, error) {
    // ...
};
```

- `message` 
  - 에러 메시지
- `url` 
  - 에러가 발생한 스크립트의 URL
- `line`, `col`
  - 에러가 발생한 곳의 줄과 열 번호

- `error`
  - 에러 객체

전역 핸들러 `window.onerror`는 죽어버린 스크립트를 복구하려는 목적으로는 잘 사용하지 않고 개발자에게 에러 메시지를 보내는 용도로 사용한다.

<br>

### 에러 로깅 관련 상용 서비스

1. [https://errorception.com](https://errorception.com/) 

2. [http://www.muscula.com](http://www.muscula.com/)

<br>

### 서비스 동작 프로세스

- 서비스를 가입하면 자바스크립트 파일 혹은 스크립트 url을 받게 되는데, 개발자는 이 파일을 페이지에 삽입한다.
- 받은 파일은 커스텀 `window.onerror` 함수를 설정한다.
- 에러가 발생하면, 이 커스텀 함수가 에러에 관한 내용을 담아 서비스에 네트워크 요청을 보낸다.
- 개발자는 서비스 사이트에 로그인해 기록된 에러를 확인한다.

