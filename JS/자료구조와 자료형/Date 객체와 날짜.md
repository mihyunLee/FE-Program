# Date 객체와 날짜



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



> Date 객체?

Date 객체를 활용하면 생성 및 수정 시간을 저장하거나 시간을 측정할 수 있고, 현재 날짜를 출력하는 용도 등으로도 활용할 수 있다.

<br>

## 1. 객체 생성하기

- `new Date()` - 현재 날짜와 시간이 저장된 `Date` 객체가 반환된다.
- `new Date(milliseconds)` - UTC 기준 1970년 1월 1일 0시 0분 0초에서 `milliseconds` 밀리초(1/1000초) 후의 시점이 저장된 `Date` 객체가 반환된다.
  - 1970년 첫날을 기준으로 흘러간 밀리초를 나타내는 정수는 *타임스탬프(timestamp)*라고 부른다.
  - 1970년 1월 1일 이전 날짜에 해당하는 타임스탬프 값은 음수이다.

- `new Date(datestring)` - 인수가 문자열이면 자동으로 구문 분석되어 코드가 실행되는 시간대(timezone)에 따라 날짜가 출력된다.

  - ```javascript
    let date = new Date("2017-01-26");
    alert(date);
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // 혹은
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)등
    ```

- `new Date(year, month, date, hours, minutes, seconds, ms)` - 주어진 인수를 조합해 만들 수 있는 날짜가 저장된 객체가 반환된다. 첫 번째 인수와 두 번째 인수만 **필수값**

  - `year` - 네 자리 숫자여야 함  (Ex. 2018, 2022)
  - `month` - `0`(1월)부터 `11`(12월) 사이의 숫자
  - `date` - 일을 나타내는데, 값이 없을 땐 1일로 처리된다.
  - `hours/minutes/seconds/ms` - default는 `0`

  - ```javascript
    new Date(2011, 0, 1); // 2011년 1월 1일, 00시 00분 00초
    ```

<br>

## 2. 날짜 구성요소 얻기

> Date 객체의 메서드

- `getFullYear()` - 연도(네 자릿수)를 반환
  - `getYear()`는 더는 사용되지 않는 메서드로, 두 자릿수 연도를 반환하는 경우가 있기 때문에 절대 사용하지 않는다.
- `getMonth()` - 월을 반환 (0~11)
- `getDate()` - 일을 반환 (1~31)
- `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()` - 시, 분, 초, 밀리초 반환

- `getDay()` - 일요일(`0`)부터 토요일(`6`)까지의 숫자 중 하나를 반환한다.

위의 메서드는 **현지 시간 기준** 날짜 구성요소를 반환한다. get 다음에 `UTC`를 붙여주면 **표준시 기준**의 날짜 구성 요소를 반환해주는 메서드를 만들 수 있다.

<br>

- `getTime()` - 주어진 일시와 1970년 1월 1일 00시 00분 00초 사이의 간격(밀리초 단위)인 **타임스탬프**를 반환한다.
- `getTimezoneOffset()` - 현지 시간과 표준 시간의 차이(분)를 반환한다.

위의 두 메서드는 표준시(UTC+0) 기준의 날짜 구성 요소를 반환해주는 메서드가 없다.

<br>

## 3. 날짜 구성요소 설정하기

- [`setFullYear(year, [month], [date])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)
- [`setMonth(month, [date])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
- [`setDate(date)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)
- [`setSeconds(sec, [ms])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)
- [`setMilliseconds(ms)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds)
- [`setTime(milliseconds)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) (1970년 1월 1일 00:00:00 UTC부터 밀리초 이후를 나타내는 날짜를 설정)

`setTime()`을 제외한 모든 메서드는 `setUTCHours()` 같이 표준시에 따라 날짜 구성 요소를 설정해주는 메서드가 있다.

<br>

## 4. 자동 고침

`Date` 객체는 범위를 벗어나는 값을 설정하려고 하면 자동 고침 기능이 활성화되면서 값이 자동으로 수정된다.

```javascript
let date = new Date(2013, 0, 32);
alert(date); // 2013년 2월 1일
```



2016년 2월 28일의 이틀 뒤 날짜를 구한다면 2016년이 윤년인지 아닌지 생각할 필요 없이 이틀을 더해주기만 하면 `Date` 객체가 알아서 처리해준다.

```javascript
let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

alert( date ); // 2016년 3월 1일
```

<br>

## 5. Date 객체를 숫자로 변경해 시간차 측정하기

`Date` 객체를 숫자형으로 변경하면 타임스탬프가 된다.

```javascript
let date = new Date();
alert(+date); // 타임스탬프(date.getTime()를 호출한 것과 동일)
```

이를 응용하여 날짜에 마이너스 연산자를 적용하면 밀리초 기준 시차를 구할 수 있다.

<br>

## 6. Date.now()

현재 타임스탬프를 반환하는 `Date.now()` 메서드를 응용하면 `Date`객체를 만들지 않고도 시차를 측정할 수 있다.

`Date.now()`는 `new Date().getTime()` 과 동일하지만 중간에 `Date` 객체를 만들지 않아 속도가 더 빠르고 가비지 컬렉터의 일을 덜어준다는 장점이 있다.

<br>

## 7. 벤치마크 테스트

**벤치마크 테스트**는 비교 대상을 두고 성능을 비교하여 시험하고 평가할 때 쓰인다.

<br>

`date.getTime()`를 사용하여 날짜를 밀리초 단위로 얻어 차이를 계산하는 함수(`diffGetTime`)와 마이너스 연산자를 적용하여 객체를 숫자형으로 변화해 차이를 계산하는 함수(`diffSubtract`)의 성능을 비교해보자. 

<br>

`diffSubtract`와 `diffGetTime`은 간단한 함수이기 때문에 유의미한 시차를 구하기 위해서는 각 함수를 최소한 십만 번 호출해야한다.

```javascript
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'diffSubtract를 십만번 호출하는데 걸린 시간: ' + bench(diffSubtract) + 'ms' );
alert( 'diffGetTime을 십만번 호출하는데 걸린 시간: ' + bench(diffGetTime) + 'ms' );
```

위의 벤치마크는 멀티 프로세스를 지원하는 운영체제에서 그다지 좋지 않은 벤치마크가 된다.

`bench(diffSubtract)`가 실행되고 있을 때 CPU가 다른 작업을 병력적으로 처리하고 있고, `bench(diffGetTime)`을 실행할 땐 이 작업이 끝난 상태라면 정확한 성능 테스트 결과가 나올 수 없다.

따라서, 신뢰성을 올리기 위해서는 `benchmark`를 번갈아 가면서 여러 번 돌려야 한다.

```javascript
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

// 함수 bench를 각 함수(diffSubtract, diffGetTime)별로 10번씩 돌린다.
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}

alert( 'diffSubtract에 소모된 시간: ' + time1 );
alert( 'diffGetTime에 소모된 시간: ' + time2 );
```

모던 자바스크립트 엔진은 아주 많이 실행된 코드인 `hot code`를 대상으로 최적화를 수행한다.

위 예시에서 bench를 첫 번째 실행했을 때는 최적화가 잘 적용되지 않기 때문에 메인 반복문을 실행하기 전에 예열용으로 bench를 실행할 수 있다.

```javascript
// 메인 반복문 실행 전, "예열용"으로 추가한 코드
bench(diffSubtract);
bench(diffGetTime);

// 벤치마크 테스트 시작
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

<br>

## 8. Date.parse와 문자열

`Date.parse(str)`를 사용하면 문자열에서 날짜를 읽어올 수 있다. 단, 문자열의 형식은 `YYYY-MM-DDTHH:mm:ss.sssZ`처럼 생겨야 한다.

- `YYYY-MM-DD` : 날짜(연-월-일)
- `T` : 구분 기호
- `HH:mm:ss.sss` : 시:분:초.밀리초
- `Z` : 옵션 - `+-hh:mm` 형식의 시간대를 나타낸다. `Z` 한 글자인 경우엔 UTC+0을 나타냄

`YYYY-MM-DD`나 `YYYY` 같이 더 짧은 문자열 형식도 가능하다.

위 조건을 만족하는 문자열을 대상으로 `Date.parse(str)`를 호출하면 문자열과 대응하는 날짜의 타임스탬프가 반환되고, 조건에 맞지 않은 경우엔 `NaN`이 반환된다.

```javascript
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (타임스탬프)
```



`Date.parse(str)`를 이용하면 타임스탬프만으로도 새로운 `Date` 객체를 만들 수 있다.

```javascript
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);
```

