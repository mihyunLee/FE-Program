# JSON과 메서드



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



> JSON이란?

**JSON(JavaScript Object Notation)** 은 값이나 객체를 나타내주는 범용 포맷이다. JSON은 본래 자바스크립트에서 사용할 목적으로 만들어졌지만 라이브러리를 사용하면 자바스크립트가 아닌 언어에서도 충분히 다룰 수 있기 때문에 JSON을 `데이터 교환` 목적으로 사용하는 경우가 많다.

- `JSON.stringify` - 객체를 JSON으로 바꿔준다.
- `JSON.parse` - JSON을 객체로 바꿔준다.

<br>

## 1. JSON.stringify

```javascript
let json = JSON.stringify(value[, replacer, space])
```

- `value` - 인코딩 하려는 값

- `replacer` - JSON으로 인코딩 하길 원하는 프로퍼티가 담긴 배열 또는 매핑함수 `function(key, value)`

- `space` - 서식 변경 목적으로 사용할 공백 문자 수

<br>

`JSON.stringify`로 변경된 문자열은 **JSON으로 인코딩된(JSON-encoded), 직렬화 처리된(serialized), 문자열로 변환된(stringified), 결집된(marshalled) 객체**라고 부른다.

객체는 이렇게 문자열로 변환된 후에 네트워크를 통해 전송하거나 저장소에 저장할 수 있다.

<br>

- JSON으로 인코딩된 객체의 특징
  - 문자열은 큰따옴표로 감싸야한다. JSON에서는 작은따옴표나 백틱을 사용할 수 없다.
  - 객체 프로퍼티 이름은 큰따옴표로 감싸야한다.
- `JSON.stringify`를 적용할 수 있는 자료형
  - 객체
  - 배열
  - 원시형
    - 문자형
    - 숫자형
    - 불린형
    - null
- `JSON.stringify`를 무시하는 프로퍼티
  - 함수 프로퍼티(메서드)
  - 키가 심볼인 프로퍼티
  - 값이 `undefined`인 프로퍼티

<br>

## 2. replacer로 원하는 프로퍼티만 직렬화하기

순환 참조를 다뤄야 하는 경우같이 전환 프로세스를 조정하기 위해서는 `JSON.stringify`의 두 번째 인수인 `replacer`를 사용해야한다.

```javascript
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

`replacer`에 `name`과 `number`를 포함시켜야 `participants`와 `place`가 채워진다.

<br>

`replacer`에는 배열 대신 함수를 전달할 수도 있다. 전달되는 함수는 프로퍼티 쌍 전체를 대상으로 호출되는데, 반드시 기존 프로퍼티 값을 대신하여 사용할 값을 반환해야 한다.

특정 프로퍼티를 직렬화에서 누락시키려면 반환 값을 `undefined`로 만들면 된다.

```javascript
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* replacer 함수에서 처리하는 키:값 쌍 목록
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

`replacer`함수는 재귀적으로 키-값 쌍을 처리하는데, 함수 내에서 `this`는 현재 처리하고 있는 프로퍼티가 위치한 객체를 가리킨다.

첫 얼럿창에 `":[object Object]"`가 뜨는 이유는 함수가 최초로 호출될 때 `{"": meetup}` 형태의 **래퍼 객체**가 만들어지기 때문이다. `replacer` 함수가 가장 처음으로 처리해야하는 `(key, value)` 쌍에서 `키`는 `빈 문자열`, `값`은 `변환하고자 하는 객체`(meetup) 전체가 되는 것이다.

<br>

## 3. space로 가독성 높이기

`JSON.stringify(value, replacer, space)`의 세 번째 인수 `space`는 가독성을 높이기 위해 중간에 삽입해 줄 공백 문자 수를 나타낸다.

`space`는 가독성을 높이기 위한 용도로 만들어졌기 때문에 단순 전달 목적이라면 `space`없이 직렬화하는 경우가 많다.

```javascript
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* 공백 문자 두 개를 사용하여 들여쓰기함:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/
```

<br>

## 4. 커스텀 toJSON

`toString`을 사용해 객체를 문자형으로 변환시키는 것처럼 `JSON.stringify`는 이런 경우를 감지하고 `toJSON`을 자동으로 호출해준다.

```javascript
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",
    "room": {"number":23}
  }
*/
```

Date 객체의 내장 메서드 `toJSON`이 호출되면서 `date`의 값이 문자열로 변환된다.

<br>

## 5. JSON.parse

`JSON.parse`를 사용하면 JSON으로 인코딩된 객체를 다시 객체로 디코딩 할 수 있다.

```javascript
let value = JSON.parse(str, [reviver]);
```

- `str` - JSON 형식의 문자열
- `reviver` - 모든 `(key, value)` 쌍을 대상으로 호출되는 `function(key, value)` 형태의 함수로 값을 변경시킬 수 있다.

```javascript
// 문자열로 변환된 배열
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

<br>

## 6. reviver 사용하기

```javascript
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

alert( meetup.date.getDate() ); // Error
```

`meetup.date`의 값은 `Date`객체가 아니고 문자열이기 때문에 에러가 발생한다.

이럴 때 `JSON.parse`의 두 번째 인수 `reviver`를 사용해서 `date`만 `Date`객체를 반환하도록 함수를 구현한다.

```javascript
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( meetup.date.getDate() ); // 30
```

