# iterable 객체



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



> **iterable 객체?**

배열을 일반화한 **반복 가능한**(iterable, 이터러블) 객체이다.

이터러블이라는 개념을 사용하면 어떤 객체에든 `for..of` 반복문을 적용할 수 있다.

<br>

## 1. Symbol.iterator

```javascript
let range = {
    from: 1,
    to 5
};
```

`range`를 이터러블로 만들려면(`for..of`가 동작하도록 하려면) 객체에 `Symbol.iterator`라는 메서드를 추가해야한다.

1. `for..of` 최초 호출 시 `Symbo.iterator` 호출하기. 이 때, `Symbol.iterator`는 반드시 이터레이터(iterator, 메서드 `next`가 있는 객체)를 반환해야 한다.

2. `for..of`는 반환된 객체(이터레이터)만을 대상으로 동작한다.
3. `for..of`에 다음 값이 필요하면, `for..of`는 이터레이터의 `next`메서드를 호출한다.
4. `next()`의 반환 값은 `{done: Boolean, value: any}`와 같은 형태여야 한다.
   `done=true`는 반복 종료, `done=false`는 `value`에 다음 값이 저장된다.

```javascript
let range = {
  from: 1,
  to: 5
};

// 1. for..of 최초 호출 시, Symbol.iterator 호출
range[Symbol.iterator] = function() {

  // Symbol.iterator는 이터레이터 객체를 반환한다.
  // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작한다.
  return {
    current: this.from,
    last: this.to,

    // 3. for..of 반복문에 의해 반복마다 next()가 호출된다.
    next() {
      // 4. next()는 값을 객체 {done:.., value :...}형태로 반환해야 한다.
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// for..of 가 동작된다
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

<br>

이터러블 객체의 핵심은 ***관심사의 분리(Separation of conern, SoC)*** 로, `range[Symbol.iterator]()`를 호출해서 만든 이터레이터 객체와 이 객체의 메서드 `next()`에서 반복에 사용될 값을 만들어내서 이터레이터 객체와 반복 대상인 객체를 분리한다.



```javascript
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

위 코드처럼 이터레이터 객체와 반복 대상을 합쳐서 `range` 자체를 이터레이터로 만들면 코드가 더 간단해진다. 하지만 두 개의 `for..of` 반복문을 하나의 객체에 동시에 사용할 수 없다.

<br>

## 2. 문자열은 이터러블이다

```javascript
for (let char of "test") {
  alert( char ); // t, e, s, t가 차례대로 출력됨
}
```


<br>

## 3. 이터레이터를 명시적으로 호출하기

```javascript
let str = "Hello";

// for..of를 사용한 것과 동일한 작업을 한다.
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 글자가 하나씩 출력된다.
}
```

위와 같이 이터레이터를 명시적으로 호출하면 `for..of`를 사용하는 것보다 반복 과정을 잘 통제할 수 있다.

반복을 시작했다가 잠시 멈췄다가 다시 반복을 시작하는 등 반복 과정을 여러 개로 쪼개는 것이 가능하다.

<br>

## 4. 이터러블과 유사 배열

> 이터러블 vs 유사 배열

- 이터러블(iterable)
  - 메서드 `Symbol.iterator`가 구현된 객체

- 유사 배열(array-like)
  - 인덱스와 `length` 프로퍼티가 있어서 배열처럼 보이는 객체

문자열은 이터러블 객체이면서 유사 배열 객체이다.



```javascript
let arrayLike = { // 인덱스와 length프로퍼티가 있음 => 유사 배열
  0: "Hello",
  1: "World",
  length: 2
};

// Symbol.iterator가 없으므로 에러 발생
for (let item of arrayLike) {}
```

`arrayLike`는 유사 배열 객체이긴 하지만 이터러블 객체가 아니다.

<br>

## 5. Array.from

`Array.from`은 이터러블이나 유사 배열을 받아 `Array`로 만들어준다. 이 과정을 거쳐 이터러블이나 유사 배열에 배열 메스드를 사용할 수 있다.

```javascript
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); 
alert(arr.pop()); // World
```

`Array.from`은 인수가 이터러블이나 유사 배열인 경우, 새로운 배열을 만들고 객체의 모든 요소를 새롭게 만든 배열로 복사한다.

