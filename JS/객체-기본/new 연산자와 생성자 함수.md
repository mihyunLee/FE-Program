# new 연산자와 생성자 함수



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



## 1. 생성자 함수

`생성자 함수`(constructor function)와 일반 함수에 기술적인 차이는 없지만, 생성자 함수는 아래 두 관례를 따른다.

1. 함수 이름의 첫 글자는 대문자로 시작한다.
2. `new` 연산자를 붙여 실행한다.

<br>

### `new User(..)`를 사용해서 실행하면 동작하는 알고리즘

1. 빈 객체를 만들어 `this`에 할당한다.
2. 함수 본문을 실행하고, `this`에 새로운 프로퍼티를 추가해 `this`를 수정한다.
3. `this`를 반환한다.

```javascript
function User(name) {
  // this = {}; (빈 객체가 암시적으로 만들어진다.)
    
  // this에 새로운 프로퍼티 추가
  this.name = name;
  this.isAdmin = false;
    
  // return this; (this가 암시적으로 반환된다.)
}

let user = new User("보라");

alert(user.name); // 보라
alert(user.isAdmin); // false
```

`let user = new User("보라");`는 아래 코드와 동일하게 동작한다.

```javascript
let user = {
    name: "보라",
    isAdmin: false
};
```

생성자 함수를 사용하면 재사용할 수 있는 객체 생성 코드를 구현할 수 있다.

객체를 하나씩 만드는 방법보다 `new User("보라")`, `new User("지민")` 등 사용자 객체를 쉽게 만들 수 있는 것이다.

<br>

### new function() {...}

```javascript
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  ...
};
```

위 생성자 함수는 **익명 함수**이다. 처음 만들 때부터 단 한 번만 호출할 목적으로 만들었기 때문에 재사용이 불가능하다. 

이렇게 익명 생성자 함수를 이용하면 재사용은 막으면서 코드를 캡슐화 할 수 있다.

<br>

## 2. new.target과 생성자 함수

`new.target` 프로퍼티를 사용하면 함수가 `new`와 함께 호출되었는지 아닌지 알 수 있다.

| 함수 호출 방법                             | 반환 값               |
| ------------------------------------------ | --------------------- |
| 일반적인 방법(in regular mode)             | undefined             |
| `new`를 사용해서 호출(in constructor mode) | 함수 자체를 반환한다. |

```javascript
function User() {
  alert(new.target);
}

// 'new' 없이 호출함
User(); // undefined

// 'new'를 붙여 호출함
new User(); // function User { ... }
```

<br>

## 3. 생성자와 return문

생성자 함수에서 반환해야 할 것들은 모두 `this`에 저장되고, `this`는 자동으로 반환되기 떄문에 보통 `return`문이 없다.

>  만약 `return`문이 있다면?

- `return`뒤에 객체가 오면 생성자 함수는 해당 객체를 반환해주고, 이 외의 경우에는 `this`가 반환된다.

```javascript
function BigUser() {

  this.name = "원숭이";

  return { name: "고릴라" };  // return 뒤에 객체가 옴
}

// 새로운 객체를 반환한다.
alert( new BigUser().name );  // 고릴라
```

<br>

### 괄호 생략하기

인수가 없는 생성자 함수는 괄호를 생략해 호출할 수 있지만, 좋은 스타일은 아니다.

```javascript
// 아래의 두 코드는 똑같이 동작한다.
let user = new User;
let user = new User();
```

<br>

## 4. 생성자 내 메서드

생성자 함수를 사용하면 매개변수를 이용해 `this`에 메서드를 더해줄 수 있다.

```javascript
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "제 이름은 " + this.name + "입니다." );
  };
}

let bora = new User("이보라");

bora.sayHi(); // 제 이름은 이보라입니다.
```

<br>

## 5. 자바스크립트의 생성자 함수

- Date - 1970년 1월 1일 UTC 자정과의 시간 차이를 밀리초로 나타내는 정수 값을 담는 Date 객체를 반환한다.
- Set - 자료형에 관계 없이 원시 값과 객체 참조 모두 유일한 값을 저장하는 Set 객체를 생성한다.
- 기타 등등