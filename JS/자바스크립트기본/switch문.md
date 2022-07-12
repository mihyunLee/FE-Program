# switch문



> 출처 - [모던 JS 튜토리얼](****https://ko.javascript.info/****) 을 보고 정리한 글입니다.



<br>



복수의 `if` 조건문은 `switch`문으로 바꿀 수 있다.

<br>

## 1. 문법

`switch`문은 하나 이상의 `case`문으로 구성된다.

```javascript
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- `case`문에서 변수 `x`의 값과 일치하는 값을 찾으면 해당 `case`문의 아래의 코드가 실행된다.
- 이때, `break`문을 만나거나 `switch`문이 끝나면 코드의 실행은 멈춘다.
- 값과 일치하는 `case`가 없다면 `default`문 아래의 코드가 실행된다.
- `switch`문은 일치 비교(`===`)로 조건을 확인하기 때문에 비교하려는 값과 `case`문의 값의 형과 값이 같아야한다.

<br>

## 2. 예시

`break`문이 없는 경우 `case`문과 변수`x`의 값이 일치하는 부분부터 코드가 모두 실행된다.

```javascript
let a = 2 + 2;

switch (a) {
  case 3:
    alert( '비교하려는 값보다 작습니다.' ); // 실행 안 됨
  case 4:
    alert( '비교하려는 값과 일치합니다.' ); // 실행됨
  case 5:
    alert( '비교하려는 값보다 큽니다.' ); // 실행됨
  default:
    alert( "어떤 값인지 파악이 되지 않습니다." ); // 실행됨
}

```

<br>

변수 `x`의 자리에는 아래 코드의 `number % 2` 처럼 표현식도 들어갈 수 있다.

```javascript
let number = prompt("숫자를 입력하세요");

switch(number % 2){
    case 0:
        alert("짝수를 입력하셨네요");
        break;
    case 1:
    	alert("홀수를 입력하셨네요");
        break;
    default:
        alert("숫자를 입력해주세요!!");
}
```

<br>

코드가 같은 `case`문을 묶어서 표현할 수 있다.

```javascript
let a = 3;

switch (a) {
  case 4:
    alert('계산이 맞습니다!');
    break;

  case 3: // 두 case문을 묶음
  case 5:
    alert('계산이 틀립니다!');
    alert("수학 수업을 다시 들어보는걸 권유 드립니다.");
    break;

  default:
    alert('계산 결과가 이상하네요.');
}
```

