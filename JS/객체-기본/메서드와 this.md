# 메서드와 this



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



객체는 사용자(user), 주문(order) 등과 같이 실제 존재하는 `개체`(entity)를 표현하고자 할 때 생성된다.

자바스크립트에선 객체의 프로퍼티에 함수를 할당해 객체에게 **행동할 수 있는 능력**을 부여해준다.

<br>

## 1. 메서드 만들기

```javascript
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!
```

`user`의  `sayHi`처럼 객체 프로퍼티에 할당된 함수를 *메서드(method)* 라고 부른다.

메서드는 이미 정의된 함수를 이용해서 만들 수도 있다.

<br>

> **객체 지향 프로그래밍**

객체를 사용하여 개체를 표현하는 방식을 *객체 지향 프로그래밍(object-oriented programming, OOP)* 이라 부른다.

<br>

### 메서드 단축 구문

```javascript
// 아래 두 객체는 동일하게 동작한다.

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 단축 구문을 사용
user = {
  sayHi() { // "sayHi: function()"과 동일
    alert("Hello");
  }
};
```

일반적인 방법과 단축 구문을 사용한 방법이 완전히 동일하진 않고, 객체 상속과 관련되어 미묘한 차이가 있긴하다.

<br>

## 2. 메서드와 this

대부분의 메서드는 객체에 저장된 정보에 접근할 수 있게 작성된다.

`user.sayHi()`에서 객체 `user`에 저장된 이름을 이용해 인사말을 만드는 경우 등이 있다.



`this` 키워드는 메서드 내부에서 객체에 접근할 수 있게 해준다.

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // 'this'는 '현재 객체'를 나타낸다.
    alert(this.name);
   	// 'this' 대신 외부 변수를 참조해 접근
    alert(user.name);
  }

};

user.sayHi(); // John
```

`user.sayHi()`가 실행되는 동안에 `this`는 `user`를 나타낸다.

`this`를 사용하지 않고 외부 변수를 참조해 객체에 접근하는 것도 가능하다.

<br>

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // Error: Cannot read property 'name' of null
  }

};


let admin = user;
user = null;

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생
```

하지만, 위의 코드처럼 외부 변수를 사용해 객체를 참조하면 `user`를 복사해 다른 변수에 할당하고  `user`에 다른 값으로 덮어썼을 때, `sayHi()`는 원치 않는 값을 참조하게 된다.

<br>

## 3. 자유로운 this

자바스크립트에선 다른 언어와 달리 모든 함수에 `this`를 사용할 수 있다.



```javascript
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수 사용
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라진다.
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작)
```

`this`값은 런타임에 결정된다.

동일한 함수라도 다른 객체에서 호출했다면 `this`가 참조하는 값이 달라진다.

<br>

### 객체 없이 호출하기

```javascript
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

- 엄격 모드: `this`에  `undefined`가 할당
- 엄격 모드 X: `this`는 전역 객체를 참조, 브라우저 환경에선 `window`라는 전역 객체를 참조한다.

함수 본문에 `this`가 사용되었다면, 객체 컨텍스트 내에서 함수를 호출할 것이라고 생각하면 된다.

<br>

## 4. this가 없는 화살표 함수

화살표 함수는 일반 함수와는 달리 **고유한** `this`를 가지지 않는다.

화살표 함수에서 `this`를 참조하면, 화살표 함수가 아닌 평범한 외부 함수에서 `this` 값을 가져온다.

```javascript
let user = {
  firstName: "보라",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // 보라
```

`arrow()`의 `this`는 외부 함수 `user.sayHi()`의 `this`가 된다.

별개의 `this`가 만들어지는 건 원하지 않고, 외부 컨텍스트에 있는 `this`를 이용하고 싶은 경우 화살표 함수를 사용한다.

