# 상품 검색 기능 구현 가이드

**작성일:** 2026-05-15  
**대상 파일:** `src/pages/Home.jsx`, `src/hooks/useProductFilter.js` (신규), `src/hooks/useDebounce.js` (신규)

---

## 1. 기능 개요

홈 화면의 상품 목록 위에 검색 입력창을 추가한다.  
사용자가 상품명(한글/영문)을 입력하면 디바운스를 거쳐 목록을 필터링한다.  
카테고리 필터와 검색어 필터는 AND 조건으로 함께 적용된다.

---

## 2. 완료 조건

- [x] 검색 입력창에 텍스트를 입력하면 상품명 기준으로 목록이 필터링된다
- [x] 한글 상품명(`name`)과 영문 상품명(`englishName`) 모두 검색 대상이다
- [x] 대소문자 구분 없이 검색된다
- [x] 카테고리 필터와 검색어 필터가 동시에 적용된다
- [x] 검색 결과가 없을 때 안내 문구가 표시된다
- [x] 검색창 우측 X 버튼으로 입력값을 초기화할 수 있다
- [x] 카테고리를 변경해도 검색어는 유지된다
- [x] 한글 마지막 글자가 중복 처리되지 않는다 (IME 조합 이슈 처리)
- [x] 입력 후 300ms 동안 추가 입력이 없을 때만 필터가 실행된다 (디바운스)
- [x] Enter 키를 누르면 디바운스 대기 없이 즉시 필터가 실행된다
- [x] 카테고리 선택 시 검색창 왼쪽에 카테고리 배지가 표시된다
- [x] 배지 클릭 시 카테고리가 전체로 초기화된다

---

## 3. 구현 전략

### 3-1. 상태 구조

디바운스 도입으로 입력값과 필터값을 **두 개의 상태로 분리**한다.

| 상태 | 역할 | 위치 |
|---|---|---|
| `inputValue` | 입력창에 바인딩되는 즉시 반응 값 | `Home.jsx` `useState` |
| `debouncedQuery` | 필터에 실제로 사용되는 지연 값 | `useDebounce` 훅 반환값 |
| `isComposing` | 한글 IME 조합 중 여부 플래그 | `Home.jsx` `useState` |

```js
// Home.jsx
const [activeCategory, setActiveCategory] = useState('전체');
const [inputValue, setInputValue] = useState('');
const [isComposing, setIsComposing] = useState(false);

const debouncedQuery = useDebounce(inputValue, 300);

// 필터는 debouncedQuery 기준으로 실행
const filtered = useProductFilter(products, activeCategory, debouncedQuery);
```

> `inputValue`는 입력창 표시용이므로 IME 조합 중에도 즉시 업데이트한다.  
> 필터 실행에 쓰이는 `debouncedQuery`만 조합 완료 + 디바운스 조건을 모두 충족한 뒤 반영된다.

---

### 3-2. `useDebounce` 훅

`src/hooks/useDebounce.js`로 분리한다. 범용 훅이므로 이후 다른 입력에도 재사용할 수 있다.

```js
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // 새 입력이 들어오면 이전 타이머 취소
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

동작 흐름:

```
입력: "사" → "사과"
       ↓          ↓
   inputValue 즉시 갱신
               300ms 경과 후 debouncedQuery 갱신 → 필터 실행
```

300ms 안에 다음 입력이 들어오면 이전 타이머를 취소하고 다시 시작한다.

---

### 3-3. `useProductFilter` 훅

필터링 로직을 `src/hooks/useProductFilter.js`로 분리한다.  
`debouncedQuery`를 받아 `useMemo`로 필터링된 배열을 반환한다.

```js
// src/hooks/useProductFilter.js
import { useMemo } from 'react';

function useProductFilter(products, activeCategory, searchQuery) {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory =
        activeCategory === '전체' || p.category === activeCategory;

      const matchQuery =
        query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.englishName.toLowerCase().includes(query);

      return matchCategory && matchQuery;
    });
  }, [products, activeCategory, searchQuery]);
}

export default useProductFilter;
```

---

### 3-4. 한글 IME 조합 이슈 처리

#### 문제

한글은 자음·모음을 조합해 한 글자를 완성하는 IME(Input Method Editor) 방식으로 입력된다.  
브라우저는 조합 중인 문자에 대해서도 `onChange`를 발생시키기 때문에, 마지막 글자가 **완성되는 시점에 `onChange`가 한 번 더 발생**한다.

예시: `"사과"` 입력 시 이벤트 흐름

```
ㅅ → 사 → 삭 → 사과  ← onChange 연속 발생
사과 (조합 완료)      ← compositionend 후 onChange 한 번 더 발생
```

디바운스만으로는 이 문제가 해결되지 않는다. `debouncedQuery`가 300ms 후 `"사과"`로 반영되는 시점에 필터가 두 번 실행되거나, 조합 중 `"삭"` 같은 중간 상태가 `inputValue`를 통해 디바운스에 유입될 수 있다.

#### 해결: `isComposing` 플래그

`onCompositionStart` / `onCompositionEnd`로 조합 중 여부를 추적한다.  
`inputValue`는 조합 중에도 즉시 반영하되, 조합 완료 시점에 `onCompositionEnd`에서 최종값을 명시적으로 재반영한다.

```jsx
<input
  value={inputValue}
  onChange={(e) => {
    // 조합 중일 때는 inputValue만 업데이트 (화면 표시용)
    // debouncedQuery는 isComposing이 false일 때만 inputValue를 따라감
    setInputValue(e.target.value);
  }}
  onCompositionStart={() => setIsComposing(true)}
  onCompositionEnd={(e) => {
    setIsComposing(false);
    setInputValue(e.target.value); // 조합 완료 시점에 최종값 명시 반영
  }}
/>
```

`useDebounce`는 `inputValue`를 구독하므로, `isComposing`이 `true`인 동안 `inputValue`가 중간 상태로 바뀌더라도 300ms 타이머가 계속 리셋되어 조합 완료 전까지 `debouncedQuery`에 반영되지 않는다.

> `e.nativeEvent.isComposing`으로 단순화할 수도 있으나,
> React 합성 이벤트와 네이티브 이벤트의 타이밍 차이로 Chrome에서 불안정할 수 있다.
> 명시적 플래그 방식이 크로스 브라우저 안전성이 더 높다.

---

### 3-5. Enter 키 즉시 실행 처리

#### 문제

디바운스를 적용하면 입력 후 300ms를 기다려야 필터가 실행된다.  
사용자가 입력을 마치고 Enter를 누르는 경우, 대기 없이 즉시 결과를 보여주는 것이 자연스럽다.

#### 한글 IME와 Enter 키 충돌 주의

한글 조합 중 Enter를 누르면 브라우저가 **IME 확정(composition confirm)** 용도로 Enter를 사용한다.  
이 시점에 `onKeyDown`이 발생하므로, `isComposing`이 `true`인 동안은 검색 실행을 막아야 한다.

```
"사과" 조합 중 Enter 누름
  → isComposing === true → 검색 실행 안 함 (IME 확정으로 처리)
  → compositionend 발생 → isComposing === false

이후 Enter를 다시 누름
  → isComposing === false → 즉시 검색 실행
```

#### 구현: `useDebounce`를 우회하는 즉시 실행

`useDebounce`는 `inputValue`를 300ms 지연해 반환하는 훅이다.  
Enter 시 즉시 실행하려면 디바운스를 우회해 필터 기준값을 바로 갱신해야 한다.

이를 위해 `Home.jsx`에 `committedQuery` 상태를 추가하고,  
`useProductFilter`는 `debouncedQuery`와 `committedQuery` 중 **더 최근에 갱신된 값**을 사용한다.

가장 단순한 구현은 별도 `immediateQuery` 상태를 두고, 필터 훅에 넘기는 값을 `immediateQuery || debouncedQuery`로 처리하지 않고, 대신 **단일 `filterQuery` 상태**를 두어 두 경로(디바운스, Enter)가 모두 이 상태를 업데이트하도록 한다.

```js
// Home.jsx
const [inputValue, setInputValue] = useState('');   // 입력창 표시용
const [filterQuery, setFilterQuery] = useState(''); // 실제 필터 기준값
const [isComposing, setIsComposing] = useState(false);

const debouncedInput = useDebounce(inputValue, 300);

// 디바운스가 완료될 때마다 filterQuery 갱신
useEffect(() => {
  setFilterQuery(debouncedInput);
}, [debouncedInput]);

const filtered = useProductFilter(products, activeCategory, filterQuery);
```

Enter 시 즉시 `filterQuery`를 갱신:

```jsx
onKeyDown={(e) => {
  if (e.key === 'Enter' && !isComposing) {
    setFilterQuery(inputValue); // 디바운스 대기 없이 즉시 반영
  }
}}
```

동작 흐름 비교:

```
일반 입력:
  inputValue 갱신 → 300ms 후 debouncedInput 갱신 → filterQuery 갱신 → 필터 실행

Enter 입력 (조합 완료 후):
  inputValue 그대로 → filterQuery 즉시 갱신 → 필터 실행
```

---

### 3-6. 검색 입력 컴포넌트 구조

별도 컴포넌트 파일을 만들지 않고 `Home.jsx` 내부에 인라인으로 작성한다.  
검색창은 단일 용도이며 재사용 계획이 없으므로 추상화하지 않는다.

```jsx
<div className="relative w-full sm:max-w-xs">
  <input
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onCompositionStart={() => setIsComposing(true)}
    onCompositionEnd={(e) => {
      setIsComposing(false);
      setInputValue(e.target.value);
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && !isComposing) {
        setFilterQuery(inputValue);
      }
    }}
    placeholder="상품명으로 검색"
    className="w-full border border-gray-200 rounded-full px-4 py-2 pr-9 text-sm ..."
  />
  {inputValue && (
    <button
      onClick={() => {
        setInputValue('');
        setFilterQuery('');
      }}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      aria-label="검색어 초기화">
      ✕
    </button>
  )}
</div>
```

> X 버튼 클릭 시 `inputValue`와 `filterQuery` 둘 다 초기화해야 한다.  
> `inputValue`만 지우면 디바운스가 끝나기 전까지 이전 검색 결과가 유지된다.

---

### 3-7. 카테고리 배지 UI

카테고리가 "전체"가 아닐 때, 검색창 왼쪽에 현재 선택된 카테고리를 배지로 표시한다.  
사용자가 카테고리 선택 상태를 잊은 채 검색하는 혼란을 방지하기 위한 컨텍스트 표시이다.

- 배지는 카테고리 버튼과 동일한 색상(국내산 초록, 수입산 보라)을 사용한다
- 배지의 `×`를 클릭하면 카테고리가 "전체"로 초기화된다
- "전체" 카테고리일 때는 배지를 렌더링하지 않는다

```jsx
{activeCategory !== '전체' && (
  <button
    onClick={() => setActiveCategory('전체')}
    style={{ backgroundColor: activeCategoryColor, color: '#fff' }}
    aria-label={`${activeCategory} 필터 해제`}>
    {activeCategory} <span>✕</span>
  </button>
)}
```

### 3-8. 검색 UI 위치

카테고리 필터 버튼 아래, 상품 수 텍스트 아래에 검색 영역을 배치한다.

```
추천 상품                    [전체] [국내산] [수입산]
신선한 과일 N종
[국내산 ✕] [검색창______________][X]
```

카테고리가 "전체"일 때:
```
[검색창________________________][X]
```

레이아웃 변경 범위:

- 검색 영역을 `flex` 컨테이너로 감싸고, 배지와 입력창을 한 행에 배치한다.

---

### 3-9. 빈 결과 처리

`filtered` 배열이 비어 있을 때 상품 그리드 대신 안내 메시지를 표시한다.

```jsx
{filtered.length === 0 ? (
  <p className="text-center text-text-muted py-20">
    검색 결과가 없습니다.
  </p>
) : (
  <div className="grid ...">
    {filtered.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)}
```

---

## 4. 변경 파일 목록

| 파일 | 변경 종류 | 내용 |
|---|---|---|
| `src/hooks/useDebounce.js` | 신규 생성 | 범용 디바운스 훅 |
| `src/hooks/useProductFilter.js` | 신규 생성 | 카테고리 + 검색어 복합 필터 훅 |
| `src/pages/Home.jsx` | 수정 | `inputValue`, `filterQuery`, `isComposing` 상태 추가, 검색 UI 및 카테고리 배지 삽입, 훅 연결 |
| `e2e/search.spec.js` | 신규 생성 | 검색 기능 E2E 테스트 17개 |

---

## 5. 구현 순서

1. `src/hooks/useDebounce.js` 작성
2. `src/hooks/useProductFilter.js` 작성
3. `Home.jsx`에 `inputValue`, `filterQuery`, `isComposing` 상태 추가
4. `Home.jsx`에 검색 입력 UI 삽입 (IME, Enter, X 버튼 포함)
5. `useEffect`로 `debouncedInput → filterQuery` 연결
6. 기존 `filtered` 로직을 `useProductFilter` 훅으로 교체
7. 빈 결과 안내 UI 추가
8. 한글 입력 → 디바운스 → Enter 즉시 실행 동작 검증
9. `docs/WORK.md` 및 `docs/HISTORY.md` 업데이트
10. `CHANGELOG.md` `[Unreleased]` 업데이트

---

## 6. 범위 외 (이번 구현에 포함하지 않음)

- URL 쿼리 파라미터에 검색어 반영 (`?q=사과`)
- 검색 히스토리 저장
- 자동완성(suggestion) UI
