# call / apply와 데코레이터, 포워딩



> 출처 - [모던 JS 튜토리얼](****https://ko.javascript.info/****) 을 보고 정리한 글입니다.



<br>



## 1. 코드 변경 없이 캐싱 기능 추가하기

#### 예시. CPU를 많이 잡아먹지만 *결과가 안정적인 함수 `slow(x)`

> *결과가 안정적인 함수
>
> 인수가 같으면 호출 결과도 같은 함수.
>
> 캐싱 기능을 구한하려면 함수는 input에 따른 output이 항상 일정해야한다.

`slow(x)`가 자주 호출된다면, 결과를 어딘가에 저장(캐싱)해 재연산에 걸리는 시간을 줄이는 방법이 있다.

`slow()` 안에 캐싱 관련 코드를 추가하는 대신, **래퍼 함수**를 만들어 캐싱 기능을 추가하면 여러 가지 이점이 존재한다.

<br>

#### 데코레이터

```javascript
let cachedFunc = decorator(func);
```

데코레이터 함수는 `func`를 인수로 받아서 새로운 함수를 반환한다. 데코레이터는 함수에 추가된 `기능`정도로 보면 된다.

하나 혹은 여러 개의 데코레이터를 추가해도 함수의 코드는 변경되지 않는다.

<br>

#### 코드

```javascript
function slow(x) {
  // ... CPU 집약적인 작업 ...
  alert(`slow(${x})을/를 호출함`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // cache에 해당 키가 있으면
      return cache.get(x); // 대응하는 값을 cache에서 읽어온다.
    }

    let result = func(x);  // 그렇지 않은 경우엔 func를 호출하고,

    cache.set(x, result);  // 그 결과를 캐싱(저장)한다.
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) );
alert( "다시 호출: " + slow(1) ); // 동일한 결과

alert( slow(2) );
alert( "다시 호출: " + slow(2) ); // 윗줄과 동일한 결과
```

`cachingDecorator` 같이 인수로 받은 함수의 행동을 변경시켜주는 함수를 ***데코레이터(decorator)*** 라고 부른다.

모든 함수를 대상으로 `cachingDecorator`를 호출 할 수 있는데, 이 때 반환되는 것은 **캐싱 래퍼**이다. 함수에 `cachingDecorator`를 적용하기만 하면 캐싱이 가능한 함수를 원하는 만큼 구현할 수 있다.

<br>

#### 독립된 래퍼 함수 `cachingDecorator`의 이점

- `cachingDecorator`를 재사용 할 수 있다. 원하는 함수 어디에든 적용 가능
- 캐싱 로직이 분리되어 `slow` 자체의 복잡성이 증가하지 않는다.
- 필요하다면 여러 개의 데코레이터를 조합해서 사용할 수도 있다.

<br>

## 2. `func.call` 를 사용해 컨텍스트 지정하기

캐싱 데코레이터는 객체 메서드에 사용하기엔 적합하지 않다. 객체 메서드는 데코레이터 적용 후 제대로 동작하지 않는다.

#### 코드

```javascript
// worker.slow에 캐싱 기능을 추가
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // ... CPU 집약적인 작업 ...
    alert(`slow(${x})을/를 호출함`);
    return x * this.someMethod();
  }
};

// 이전과 동일한 코드
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x);
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // 기존 메서드는 잘 동작

worker.slow = cachingDecorator(worker.slow); // 캐싱 데코레이터 적용

alert( worker.slow(2) ); // Error: Cannot read property 'someMethod' of undefined
```

`let result = func(x)`에서 래퍼가 기존 함수 `func(x)`를 호출하면 `this`가 `undefined`가 되기 때문에 `this.someMethod`에 접근할 수 없다.

<br>

### func.call

`func.call`은 `this`를 명시적으로 고정해 함수를 호출할 수 있게 해주는 내장 함수 메서드이다.

- 문법

```javascript
func.call(context, arg1, arg2, ...)
```

메서드를 호출하면 메서드의 첫 번째 인수가 `this`로 고정되고, 이어지는 인수가 `func`의 인수가 된 후, `func`이 호출된다.

- 예시

```javascript
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// call을 사용해 원하는 객체가 'this'가 되도록 한다.
sayHi.call( user ); // this = John
sayHi.call( admin ); // this = Admin
```

```javascript
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// this엔 user가 고정되고, "Hello"는 메서드의 첫 번째 인수가 된다.
say.call( user, "Hello" ); // John: Hello
```

<br>

#### 데코레이터에 적용하기

```javascript
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert(`slow(${x})을/를 호출함`);
    return x * this.someMethod(); 
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // 'this'가 제대로 전달된다.
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // 캐싱 데코레이터 적용

alert( worker.slow(2) ); // 제대로 동작한다.
alert( worker.slow(2) ); // 제대로 동작한다. 다만, 원본 함수가 호출되지 않고 캐시 된 값이 출력된다.
```

- `this`가 전달되는 과정
  - 데코레이터 적용 후 `worker.slow`는 래퍼 `function(x) {...}`가 된다.
  - `worker.slow(2)`를 실행하면 래퍼는 `2`를 인수로 받고, `this = worker`가 된다.
  - 결과가 캐시되지 않은 상황이라면 `func.call(this, x)`에서 현재 `this(=worker)`와 인수(`=2`)를 원본 메서드에 전달한다.

<br>

## 3. 여러 인수 전달하기

#### 복수 인수를 가진 메서드 캐싱

```javascript
let worker = {
  slow(min, max) {
    return min + max; // CPU를 아주 많이 쓰는 작업이라고 가정
  }
};

// 동일한 인수를 전달했을 때 호출 결과를 기억할 수 있어야 한다.
worker.slow = cachingDecorator(worker.slow);
```

<br>

> 방법

1. 복수 키를 지원하는 맵과 유사한 자료 구조 구현하기

2. 중첩 맵 사용하기

   - `(max, result)` 쌍 저장은 `cache.set(min)`으로, `result`는 `cache.get(min).get(max)`을 사용해 얻는다.

3. 두 값을 하나로 합치기

   - `맵`의 키로 문자열 `"min, max"`를 사용한다. 여러 값을 하나로 합치는 코드는 ***해싱 함수(hashing function)**에 구현해 유연성을 높인다.

   > *해시 함수(Hash Function)
   >
   > 임의의 길이를 갖는 임의의 데이터를 고정된 길이의 데이터로 매핑하는 단방향 함수이다. 
   >
   > 쉽게 말해, 아무리 큰 숫자를 넣더라도 정해진 크기의 숫자가 나오는 함수.
   >
   > 숫자를 10으로 나누었을 때 그 나머지를 구하는 함수도 해시 함수이다.

<br>

#### 코드 - 3번째 방법 적용

```javascript
let worker = {
  slow(min, max) {
    alert(`slow(${min},${max})을/를 호출함`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // 제대로 동작한다.
alert( "다시 호출: " + worker.slow(3, 5) ); // 동일한 결과 출력(캐시된 결과)
```

> 개선점

- `hash(arguments)`에서 `hash`가 호출되면서 `arguments`를 사용한 단일 키가 만들어진다.
  간단한 결합 함수로 인수 `(3, 5)`를 키 `"3, 5"`로 바꿨지만, 좀 더 복잡한 경우 또 다른 해싱 함수가 필요할 수 있다.
- `func.call(this, ...arguments)`를 사용해 컨텍스트(`this`)와 래퍼가 가진 인수 전부`(...arguments)`를 기존 함수에 전달하였다.

<br>

## 4. func.apply

#### 문법

```javascript
func.apply(context, args)
```

`apply`는 `func`의 `this`를 `context`로 고정해주고, 유사 배열 객체인 `args`를 인수로 사용한다.

<br>

#### call과 apply의 차이

`call`은 복수 인수를 따로따로 받는 대신 `apply`는 인수를 유사 배열 객체로 받는다는 차이가 있다.

따라서 인수가 이터러블 형태라면 `call`, 유사 배열 형태라면 `apply`를 사용하면 된다.

자바스크립트 엔진은 내부에서 `apply`를 최적화하기 때문에 배열같이 이터러블이면서 유사 배열인 객체는 `apply`를 사용하는 게 좀 더 빠르다.

```javascript
// 동일한 동작을 한다.
func.call(context, ...args);
func.apply(context, args);
```

<br>

#### 콜 포워딩(call forwarding)

컨텍스트와 함께 인수 전체를 다른 함수에 전달하는 것을 **콜 포워딩(call forwarding)**이라 한다. 대게 `apply`를 사용해 구현한다.

- 코드

```javascript
let wrapper = function() {
  return func.apply(this, arguments);
};
```

위 코드와 같이 `wrapper`를 외부에서 호추라면, 기존 함수인 `func`를 호출하는 것과 명확하게 구분할 수 있다.

<br>

## 5. 메서드 빌리기

#### 해싱 함수 개선

```javascript
// 기존 함수
function hash(args) {
  return args[0] + ',' + args[1];
}

// join 메서드 적용 - 에러 발생
function hash(args) {
    return args.join();
}
```

배열 메서드인 `join()`을 사용하여 개선하고자 했지만 `hash`를 호출할 때 인수로 넘겨주는 `arguments`는 진짜 배열이 아닌 이터러블 객체나 유사 배열 객체이기 때문에 **에러가 발생**한다.



> 방법

- 함수 차용(method borrowing)하기

```javascript
function hash() {
  alert( [].join.call(arguments) ); 
}

hash(1, 2); // 1,2
```

일반 배열에서 `join` 메서드를 빌려오고 `[].join.call`를 사용해 `arguments`를 컨텍스트로 고정한 후 `join` 메서드를 호출하게 된다.

<br>

## 6. 데코레이터와 함수 프로퍼티

데코레이터를 적용한 함수에선  `func.calledCount` 등의 프로퍼티를 사용할 수 없으므로 주의해야 한다.

몇몇 데코레이터는 함수의 호출 횟수나 소요 시간 등의 정보를 래퍼의 프로퍼티에 저장할 수 있다. 이와 같은 함수 프로퍼티에 접근할 수 있는 데코레이터를 만들기 위해서는 `Proxy`라는 객체를 사용해 함수를 감싸야한다.