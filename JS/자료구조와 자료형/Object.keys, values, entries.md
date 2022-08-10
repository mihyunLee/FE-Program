# Object.keys, values, entries



> 출처 - [**모던 JS 튜토리얼**](https://ko.javascript.info/)을 보고 정리한 글입니다.



<br>



`keys()`, `values()`, `entries()`를 사용할 수 있는 자료구조

- `Map`
- `Set`
- `Array`

<br>

## 1. Object.keys, values, entries

| 메서드                | 설명                                  |
| --------------------- | ------------------------------------- |
| `Object.keys(obj)`    | 객체의 키만 담은 배열을 반환한다.     |
| `Object.values(obj)`  | 객체의 값만 담은 배열을 반환한다.     |
| `Object.entries(obj)` | `[키, 값]` 쌍을 담은 배열을 반환한다. |

<br>

- `Map`, `Set`, `Array` 전용 메서드와 일반 객체용 메서드의 차이 비교

|           | 맵            | 객체               |
| --------- | ------------- | ------------------ |
| 호출 문법 | `map.keys()`  | `Object.keys(obj)` |
| 반환 값   | iterable 객체 | 배열               |

<br>

### ⚠️Object.keys, values, entries는 심볼형 프로퍼티를 무시한다.

대개는 심볼형 키를 연산 대상에 포함하지 않는 게 좋지만, 심볼형 키가 필요한 경우엔 심볼형 키만 배열 형태로 반환해주는 메서드인 `Object.getOwnPropertySymbols`를 사용하면 된다. 이외에도 키 전체를 배열 형태로 반환하는 메서드인 `Reflect.ownKeys(obj)`를 사용해도 된다.

<br>

## 2. 객체 변환하기

객체엔 `map`, `filter`와 같은 배열 전용 메서드를 사용할 수 없는데 `Object.entries`와 `Object.fromEntries`를 순차적으로 적용하면 객체에도 배열 전용 메서드를 사용할 수 있다.

1. `Object.entries(obj)`를 사용해 객체의 키-값 쌍이 요소인 배열을 얻는다.
2. 1에서 만든 배열에 `map` 등의 배열 전용 메서드를 적용한다.
3. 2에서 반환된 배열에 `Object.fromEntries(array)`를 적용해 배열을 다시 객체로 되돌린다.