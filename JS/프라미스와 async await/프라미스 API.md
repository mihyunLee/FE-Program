# 프라미스 API



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



## 1. Promise.all

### 문법

```javascript
let promise = Promise.all([...primises...]);
```

- 모든 프라미스가 이행될 때까지 기다렸다가 그 결괏값을 담은 배열을 반환한다.
- 주어진 프라미스 중 하나라도 실패하면 `Promise.all`는 거부되고, 나머지 프라미스의 결과는 **무시**된다.
- 이터러블 객체가 아닌 일반 값도 `Promise.all(iterable)`에 넘길 수 있다. 요소가 프라미스가 아닌 객체일 경우엔 요소 **그대로** 결과 배열에 전달된다.

### 예시

```javascript
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
]).then(alert);
// 프라미스 전체가 처리되면 1, 2, 3이 반환된다.
```

- `Promise`가 반환하는 배열 `result`의 요소 순서는 `Promise.all`에 전달되는 프라미스 순서와 상응한다.
- `Promise.all`의 첫 번째 프라미스는 가장 늦게 실행되도 처리 결과는 배열의 첫 번째 요소에 저장된다.

### fetch와 함께 쓰기

```javascript
let names = ['iliakan', 'Violet-Bora-Lee', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 모든 응답이 성공적으로 이행됨
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드는 200
    }

    return responses;
  })
  // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽는다.
  .then(responses => Promise.all(responses.map(r => r.json())))
  // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장된다.
  .then(users => users.forEach(user => alert(user.name)));
```

<br>

## 2. Promise.allSettled

### 문법

```javascript
let promise = Promise.allSettled(iterable);
```

- 모든 프라미스가 처리될 때까지 기다린다.
- `Promise.allSettled`를 사용하면 각 프라미스와 상태와 `값 또는 에러`를 받을 수 있다.
- 반환값
  - 응답이 성공한 경우 -  `{status: "fulfilled", value: result}`
  - 에러가 발생한 경우 - `{status: "rejected", reason: error}`

### 예시

```javascript
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/Violet-Bora-Lee',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => {
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });

// https://api.github.com/users/iliakan: 200
// https://api.github.com/users/Violet-Bora-Lee: 200
// https://no-such-url: TypeError: Failed to fetch

/* '.then' 메서드에서의 results
[
  {status: 'fulfilled', value: ...응답...},
  {status: 'fulfilled', value: ...응답...},
  {status: 'rejected', reason: ...에러 객체...}
] 
*/
```

### 폴리필

`Promise.allSettled`는 스펙에 추가된 지 얼마 안 된 문법으로 구식 브라우저에서는 폴리필을 구현해야한다.

```javascript
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value
    }), reason => ({
      status: 'rejected',
      reason
    }))));
  };
}
```

<br>

## 3. Promise.race

### 문법

```javascript
let promise = Promise.race(iterable);
```

- `Promise.race`는 `Promise.all`과 비슷하지만 가장 먼저 처리되는 프라미스의 결과(혹은 에러)를 반환한다는 차이가 있다.

### 예시

```javascript
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

- 첫 번째 프라미스가 가장 빨리 처리상태가 되기 때문에 첫 번째 프라미스의 결과인 1이 출력된다.

- `Promise.race`를 사용하면 첫 번째로 처리되는 프라미스(`race`의 승자)가 나타난 순간 다른 프라미스의 결과 또는 에러는 무시된다.

<br>

## 4. Proimse.resolve / Promise.reject

`Promise.resolve`와 `Promise.reject`는 `async/await`가 생긴 뒤로 사용 빈도가 낮아졌다.



### (1) Promise.resolve

```javascript
let promise = new Promise(resolve => resolve(value));
```

- 위 코드와 동일한 일을 수행하며, 결괏값이 `value`인 이행 상태 프라미스를 생성한다.
- `Promise.resolve`는 호환성을 위해 함수가 프라미스를 반환하도록 해야할 때 사용할 수 있다.

### 예시

```javascript
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

- 함수 `loadChached` 인수로 받은 URL을 대상으로 `fetch`를 호출하고 그 결과를 기억(`cache`)한다.
- 나중에 동일한 URL을 대상으로 `fetch`를 호출하면 캐시에서 호출 결과를 즉시 가져오는데, 이때 `Promise.resolve`를 사용해 캐시 된 내용을 프라미스로 만들어 반환 값이 항상 프라미스가 되게 한다.
- `loadCached`를 호출하면 프라미스가 반환된다는 것이 보장되기 때문에 `loadCached(url).then(..)`을 사용할 수 있다.

<br>

### (2) Promise.reject

```javascript
let promise = new Promise((resolve, reject) => reject(error));
```

- `Promise.reject(error)`는 결괏값이 `error`인 거부 상태 프라미스를 생성하여 위 코드와 동일한 동작을 한다.