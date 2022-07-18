# 테스트 자동화와 Mocha



> 출처 - [모던 JS 튜토리얼](****https://ko.javascript.info/****) 을 보고 정리한 글입니다.



<br>



## 1. 테스트를 해야하는 이유?

개발 중엔 콘솔 창 등을 이용해 원하는 기능이 잘 구현되고 있는지 확인할 수 있다. 하지만 코드를 **수동**으로 재실행해서 테스트를 진행하면 정확한 테스트 결과가 나오지 않을 수 있다.

코드를 작성하고 변경할 때마다 모든 유스 케이스를 생각하며 테스트할 수 없기 때문에 에러가 연쇄적으로 나오게 된다.

따라서 **테스트 코드**를 통해 **테스팅 자동화**를 실행해서 `실행 결과`와 `기대 결과`를 비교하는 것이 좋다.

<br>

## 2. Behavior Drive Development (BDD)

**BDD**는 `테스트`(test), `문서`(documnetation), `예시`(example)을 모아놓은 방법론이다.

- `테스트` : 함수가 의도하는 동작을 제대로 수행하고 있는지 확인
- `문서` : `describe`와 `it`을 사용하여 함수가 어떤 동작을 하는지 설명한다.
- `예시` : 실제 동작하는 예시를 이용해 함수를 어떻게 사용할 수 있는지 알려준다.

<br>

## 3. 거듭제곱 함수와 명세서

`x`를 `n`번 곱해주는 함수, `pow(x, n)`를 구현하고 있다고 했을 때, 코드를 작성하기 전에 코드가 무슨 일을 하는지 자연어로 표현해야 한다.

이때, 만들어진 산출물을 BDD에선 *명세서(specification)* 또는 *스펙(spec)* 이라고 부른다.

```javascript
describe("pow", function() {

  it("주어진 숫자의 n 제곱", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

<br>

### 스펙의 구성요소

1. `describe("title", function() { ... })`
   - 구현하고자 하는 기능에 대한 설명
   - `it` 블록을 모아주는 역할

2. `it("유스 케이스 설명", function() { ... })`
   - 유스 케이스 설명은 누구나 읽을 수 있고 이해할 수 있는 자연어로 적어준다.
   - 두 번째 인수에는 유스 케이스 테스트 함수가 들어간다.

3. `assert.equal(value1, value2)`
   - 기능을 제대로 구현했다면, `assert.equal(value1, value2)`가 에러 없이 실행된다.

<br>

## 4. 개발 순서

1. 명세서 초안 작성 + 기본적인 테스트
2. 명세서 초안으로 코드 작성
3. 테스트 프레임워크인 [Mocha](https://mochajs.org/) 를 사용해서 명세서 실행 + 에러가 출력되지 않을 때까지 코드 수정
4. 모든 테스트를 통과하는 코드 초안 완성
5. 명세서에 새로운 유스 케이스 추가
6. 기능이 완성될 때까지 3~5단계 반복

<br>

## 5. 스펙 실행하기

- [Mocha](http://mochajs.org/) – 핵심 테스트 프레임워크로, `describe`, `it`과 같은 테스팅 함수와 테스트 실행 관련 주요 함수를 제공한다.
- [Chai](http://chaijs.com/) – 다양한 assertion을 제공해 주는 라이브러리 Ex) `assert.equal` , ...
- [Sinon](http://sinonjs.org/) – 함수의 정보를 캐내는 데 사용되는 라이브러리로, 내장 함수 등을 모방한다.

세 라이브러리 모두 브라우저나 서버 사이드 환경을 가리지 않고 사용 가능하다.



```html
<!DOCTYPE html>
<html>
<head>
  <!-- 결과 출력에 사용되는 mocha css를 불러옵니다. -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
  <!-- Mocha 프레임워크 코드를 불러옵니다. -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
  <script>
    mocha.setup('bdd'); // 기본 셋업
  </script>
  <!-- chai를 불러옵니다 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
  <script>
    // chai의 다양한 기능 중, assert를 전역에 선언합니다.
    let assert = chai.assert;
  </script>
</head>

<body>

  <script>
    function pow(x, n) {
      /* 코드를 여기에 작성합니다. 지금은 빈칸으로 남겨두었습니다. */
    }
  </script>

  <!-- 테스트(describe, it...)가 있는 스크립트를 불러옵니다. -->
  <script src="test.js"></script>

  <!-- 테스트 결과를 id가 "mocha"인 요소에 출력하도록 합니다.-->
  <div id="mocha"></div>

  <!-- 테스트를 실행합니다! -->
  <script>
    mocha.run();
  </script>
</body>

</html>
```

- `<head>` : 테스트에 필요한 서드파티 라이브러리와 스타일을 불러온다.
- `<script>` 테스트할 함수(`pow`)의 코드가 들어간다.
- 테스트 - 테스트가 있는 스크립트(`test.js`)를 불러온다.
- `<div id="mocha">` : Mocha 실행 결과가 출력된다.
- `mocha.run()` : 테스트를 실행시켜주는 명령어

<br>

## 6. 스펙 개선하기

### 스펙에 테스트 추가하기

1. 기존 `it`블록에 `assert`를 하나 더 추가하기

```javascript
describe("pow", function() {

  it("주어진 숫자의 n 제곱", function() {
    assert.equal(pow(2, 3), 8);
    assert.equal(pow(3, 4), 81);
  });

});
```

2. 테스트를 하나 더 추가하기 (`it`블록 하나 더 추가)

```javascript
describe("pow", function() {

  it("2를 세 번 곱하면 8입니다.", function() {
    assert.equal(pow(2, 3), 8);
  });

  it("3을 네 번 곱하면 81입니다.", function() {
    assert.equal(pow(3, 4), 81);
  });

});
```

- `assert`에서 에러가 발생하면 `it`블록은 즉시 종료된다.
- 따라서, 1번의 방법처럼 기존 `it`블록에 `assert`를 추가하면 어떤 첫 번째 `assert`가 실패했을 때 두 번째 `assert`의 실행 결과를 알 수 없다.
- `it` 블록을 추가해서 테스트를 분리해서 작성하면 더 많은 정보를 얻을 수 있다.

<br>

>  ⚠️ **테스트 하나에선 한 가지만 확인한다.**
>
> 테스트 하나에서 연관이 없는 사항 두 개를 점검하고 있다면, 둘을 분리하는 것이 좋다.


<br>

## 7. 코드 개선하기

```javascript
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```



- 여러 개의 `it`블록을 만드는 대신 `for`문을 사용하여 만들 수도 있다.

```javascript
// test.js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x}을/를 세 번 곱하면 ${expected}입니다.`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

<br>


## 8. 중첩 describe

중첩 `describe`를 사용하면 여러 개의 테스트 그룹을 만들 수 있다.

```javascript
describe("pow", function() {

  describe("x를 세 번 곱합니다.", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x}을/를 세 번 곱하면 ${expected}입니다.`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  // describe와 it을 사용해 이 아래에 테스트 추가 가능
});
```

`makeTest`는 두 번째 `describe("x를 세 번 곱합니다.", function ...)` 안에서만 사용 가능하고, 첫 번째 `describe("pow", function ...)` 안에서는 사용 불가능하다.

<br>

### before/after 와 beforeEach/afterEach

- `before` : 전체 테스트가 실행되기 전에 실행된다.
- `after` : 전체 테스트가 실행된 후에 실행된다.
- `beforeEach` : 매 `it`이 실행되기 전에 실행된다.
- `afterEach` : 매 `it`이 실행된 후에 실행된다.

<br>

## 9. 다양한 assertion

- `assert.equal(value1, value2)` 
  -  `value1`과 `value2`의 동등성을 확인
  - `value1 == value2`
- `assert.strictEqual(value1, value2)`
  -  `value1`과 `value2`의 일치성을 확인
  - `value1 === value2`
- `assert.notEqual`, `assert.notStrictEqual`
  -  비 동등성, 비 일치성을 확인
- `assert.isTrue(value)`
  -  `value`가 `true`인지 확인
  - `value === true`
- `assert.isFalse(value)`
  -  `value`가 `false`인지 확인
  - `value === false`
- `assert.isNaN(value)`
  - `value`가 `NaN`인지 아닌지 확인

<br>

## 10. 테스팅 자동화의 장점

- 테스트를 작성하기 위해서는 함수의 동작과 흐름을 파악한 뒤 구현해야 한다. 따라서, 구현을 시작하는 순간부터 **좋은 아키텍처**가 보장된다.
- 코드를 수정할 때 안정성이 보장되며 속도가 향상된다.