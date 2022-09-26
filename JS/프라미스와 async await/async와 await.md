# async와 await



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



> `async`와 `await`를 사용하면 프라미스를 좀 더 편하게 사용할 수 있다.

<br>

## 1. async 함수

### 문법

```javascript
async function f() {
    return 1;
}
```

- function 앞에 `async`를 붙이면 해당 함수는 항상 프라미스를 반환한다.
- 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환되도록 한다.

### 예시

```javascript
async function f() {
    return 1;
}

f().then(alert); // 1

// 명시적으로 프라미스를 반환하기. 결과값은 동일하다
/*
async function f() {
	return Promise.resolve(1);
}

f().then(alert);
*/
```

- `async`가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환한다.

<br>

## 2. await

### 문법

```javascript
let value = await promise;
```

- `await`는 `async` 함수 안에서만 동작한다.
- 자바스크립트가 `await` 키워드를 만나면 프라미스가 처리될 때까지 기다리고, 결과는 그 이후에 반환된다.
- `await`는 `promise.then`보다 좀 더 세련되게 프라미스의 `result` 값을 얻을 수 있도록 해주는 문법이다.
- `promise.then`보다 가독성이 좋고, 쓰기도 쉽다.

### 예시

```javascript
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('완료'), 1000)
    });
    
    let result = await promise; // 프라미스가 이행될 때까지 기다림
    
    alert(result); // 완료
}

f();
```

- 함수를 호출하고, 함수 본문이 실행되는 도중에 `await` 줄에서 실행이 잠시 **중단**되었다가 프라미스가 처리되면 실행이 재개된다.

- `await`는 프라미스가 처리될 때까지 함수 실행을 기다리게 만든다.

- 프라미스가 처리되면 그 결과와 함께 실행이 재개된다.

- 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일을 할 수 있기 때문에 **CPU 리소스가 낭비되지 않는다.**

<br>

#### ⚠ `await`는 최상위 레벨 코드에서 작동하지 않는다.

```javascript
// 최상위 레벨 코드에선 문법 에러가 발생
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```



- 최상위 레벨 코드에서 사용하려면 익명 `async` 함수로 코드를 감싸기

```javascript
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

<br>

#### ⚠️ `await`는 thenable 객체를 받는다.

- `promise.then`처럼 `await` 에도 thenable 객체*를 사용할 수 있다.

> **thenable 객체?**
>
> `then` 메서드가 있는 호출 가능한 객체

- thenable 객체는 서드파티 객체가 프라미스가 아니지만 프라미스와 호환 가능한 객체를 제공할 수 있다는 점에서 생긴 기능이다.
- 서드파티에서 받은 객체가 `.then`을 지원하면 이 객체를 `await`와 함께 사용할 수 있다.

```javascript
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolsve, reject) {
        alert(resolve);
        setTImeouet(() => resolve(this.num * 2), 1000);
    }
};

async function f() {
    let result = await new Thenable(1);
    alert(result);
}

f();
```

- `await`는 `.then`이 구현되어있으면서 프라미스가 아닌 객체를 받으면, 내장 함수 `resolve`와 `reject`를 인수로 제공하는 메서드인 `.then`을 호출한다.
- 그리고 나서 `await`는 `resolve`와 `reject`중 하나가 호출되길 기다렸다가 호출 결과를 가지고 다음 스크립트를 진행한다.

<br>

#### ⚠️ async 클래스 메서드

- 메서드 앞에 `async`를 추가하면 async 클래스 메서드를 선언할 수 있다.
- `async` 메서드와 `async` 함수는 프라미스를 반환하고 `await`를 사용할 수 있다는 공통점이 있다.

```javascript
class Waiter {
    async wait() {
        return await Promise.resolve(1);
    }
}

new Waiter()
	.wait()
	.then(alert); // 1
```

<br>

## 3. 에러 핸들링

- 프라미스가 정상적으로 이행되면 `await promise`는 프라미스 객체의 `result`에 저장된 값을 반환한다.
- 반면 프라미스가 거부되면 마치 `throw`문을 작성한 것처럼 에러가 던져진다.

### 예시

```javascript
async function f() {
    await Promise.reject(new Error('에러 발생'));
}

async function f() {
    throw new Error('에러 발생');
}
```

- 위의 두 코드는 동일하게 동작한다.
- 실제 프라미스가 거부되기 전에 약간의 시간이 지체되는 경우, `await`가 에러를 던지기 전에 지연이 발생한다.
- `await`가 던진 에러는 `throw`가 던진 에러를 잡을 때 처럼 `try..catch`를 사용해 잡을 수 있다.

```javascript
async function f() {
    try{
        let response = await fetch('http://유효하지-않은-주소');
        let user = await response.json();
    } catch(err) {
        // fetch와 response.json에서 발생한 에러 모두를 여기서 처리
        alert(err);
    }
}

f();
```

<br>

- `try..catch`가 없으면 async 함수 `f()`를 호출해 만든 프라미스가 거부 상태가 된다.
- `f()`에 `.catch`를 추가하면 거부된 프라미스를 처리할 수 있다.

```javascript
async function f() {
    let response = await fetch('http://유효하지-않은-주소');
}

f().catch(alert); // TypeError: failed to fetch
```

<br>

## 4. `async/await`와 `promise.then/catch`

- `async/await`을 사용하면 `await`가 대기를 처리해주기 때문에 `.then`이 거의 필요하지 않다.
- 그리고 `.catch` 대신 일반 `try..catch`를 사용할 수 있다는 장점도 있다.
- 여러 개의 프라미스가 모두 처리되길 기다려야 하는 상황이라면 프라미스들을 `Promise.all`로 감싸고 여기에 `await`를 붙여 사용할 수 있다.

```javascript
let results = await PRomise.all([
    fetch(url1),
    fetch(url2),
    ...
]);
```

