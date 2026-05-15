# 관리자 상품 등록 기능 명세

**작성일:** 2026-05-15  
**상태:** 기획 확정 / 구현 예정

---

## 1. 개요

관리자 계정으로 로그인한 사용자만 접근 가능한 상품 등록 페이지를 추가한다.  
등록된 상품은 Redux 상태에 추가되며 localStorage로 영속화된다.  
이미지는 과일 이모지 드롭다운으로 선택한다.

---

## 2. 관리자 인증

### 방식: `isAdmin` 플래그

`authSlice`의 `MOCK_USERS`에 admin 계정을 추가하고, 로그인 시 `isAdmin` 필드를 Redux user 상태에 포함한다.

```js
// authSlice MOCK_USERS
{ email: 'test@fruit.com',  password: '1234',      name: '과일러버', isAdmin: false }
{ email: 'admin@fruit.com', password: 'admin1234', name: '관리자',   isAdmin: true  }

// Redux user 상태 (로그인 후)
user: { email: 'admin@fruit.com', name: '관리자', isAdmin: true }
```

### AdminRoute

- 로그인 여부 + `user.isAdmin` 동시 확인
- 미로그인 → `/login` 리다이렉트
- 로그인했지만 admin 아님 → `/` 리다이렉트

```jsx
// router/AdminRoute.jsx
if (!isLoggedIn) return <Navigate to="/login" replace />
if (!user.isAdmin) return <Navigate to="/" replace />
return <Outlet />
```

---

## 3. 로그인 페이지 힌트 추가

기존 일반 계정 힌트 아래에 admin 계정 힌트를 나란히 표시한다.

```
연습용 계정    |   test@fruit.com / 1234
관리자 계정    |   admin@fruit.com / admin1234
```

---

## 4. 화면 명세

### URL: `/admin/product/new`

- Header / Footer 포함 (기존 App 레이아웃)
- AdminRoute로 보호 (비admin 접근 불가)

### 폼 필드

| 필드 | 입력 방식 | 유효성 |
|---|---|---|
| 상품명 (한글) | text | 필수 |
| 상품명 (영문) | text | 필수 |
| 가격 | number | 필수, 1 이상 |
| 설명 | textarea | 필수 |
| 원산지 | text | 필수 |
| 중량 | number + select (g / kg) | 필수, 0보다 커야 함. submit 시 `500g` / `1.5kg` 형태로 합산 저장 |
| 재고 | number | 필수, 0 이상 |
| 이모지 (이미지 대체) | select (드롭다운) | 필수 |
| 카테고리 | select | 국내산 / 수입산 |

### 이모지 선택 드롭다운

미선택 시 기본값 🛒 으로 저장.

```
🍎 사과      🍌 바나나    🍓 딸기      🍇 포도
🍑 복숭아    🍊 귤/오렌지  🍋 레몬      🍍 파인애플
🥭 망고      🍈 멜론      🍒 체리      🫐 블루베리
🥝 키위      🍐 배        🍉 수박      🛒 기타(기본)
```

### 등록 후 동작

- Redux `productSlice`에 상품 추가 (id는 기존 최대 id + 1 자동 부여)
- localStorage 동기화
- 홈(`/`)으로 이동

---

## 5. 데이터 흐름

```
products.json (초기 데이터)
     ↓ 앱 시작 시 로드
productSlice (Redux 상태)
     ↓ 상품 등록 시 추가
localStorage ('products' 키)
     ↓ 앱 재시작 시 복원 (localStorage 우선)
```

### productSlice 액션

| 액션 | 설명 |
|---|---|
| `addProduct(product)` | 상품 추가, id 자동 부여 |

### localStorage 키

| 키 | 내용 |
|---|---|
| `products` | 전체 상품 배열 (초기 데이터 + 등록 상품) |

---

## 6. 상품 데이터 스키마

기존 `products.json` 스키마 기준. `image` 필드에 이모지 문자열 저장.

```js
{
  id: number,          // 자동 부여
  name: string,        // 상품명 (한글)
  englishName: string, // 상품명 (영문)
  price: number,       // 가격 (원)
  description: string, // 상세 설명
  origin: string,      // 원산지
  weight: string,      // 중량 — 폼에서 weightValue + weightUnit 합산 (예: "500g", "1.5kg")
  stock: number,       // 재고 수량
  image: string,       // 이모지 문자열 (예: "🍎")
  category: string,    // "국내산" | "수입산"
}
```

---

## 7. 라우팅

```
/admin/product/new  →  AdminProductNew.jsx  (AdminRoute, App 레이아웃 포함)
```

기존 라우터에 AdminRoute 중첩 구조로 추가.

---

## 8. Header 변경

admin 계정 로그인 시 Header에 관리자 메뉴 링크 표시.

```
[로고]  [검색]  ...  [🛠 상품 등록]  [관리자]  [로그아웃]
```

- `user.isAdmin === true` 일 때만 "상품 등록" 링크 노출
- 클릭 시 `/admin/product/new` 이동

---

## 9. 신규 생성 파일

| 파일 | 설명 |
|---|---|
| `src/router/AdminRoute.jsx` | admin 전용 라우트 가드 |
| `src/pages/AdminProductNew.jsx` | 상품 등록 페이지 |
| `src/store/productSlice.js` | 상품 전역 상태 (초기 데이터 + localStorage 영속화) |
| `src/schemas/productSchema.js` | Zod 유효성 스키마 |
| `src/constants/emojis.js` | 이모지 선택지 상수 |

---

## 10. 수정 파일

| 파일 | 변경 내용 |
|---|---|
| `src/store/authSlice.js` | admin 계정 추가, `isAdmin` 필드 포함 |
| `src/store/index.js` | productSlice 등록 |
| `src/router/index.jsx` | AdminRoute + `/admin/product/new` 라우트 추가 |
| `src/pages/Login.jsx` | admin 계정 힌트 추가 |
| `src/components/layout/Header.jsx` | admin 메뉴 링크 추가 |

---

## 11. 구현 단계

| 단계 | 작업 |
|---|---|
| 1 | `authSlice` admin 계정 추가 + `isAdmin` 필드 반영 |
| 2 | `productSlice` 생성 + store 등록 |
| 3 | `AdminRoute` 컴포넌트 생성 + 라우터 등록 |
| 4 | `AdminProductNew.jsx` 페이지 + Zod 스키마 작성 |
| 5 | Login 페이지 admin 힌트 추가 + Header admin 메뉴 추가 |

---

## 12. 미포함 범위 (이번 작업 제외)

- 상품 수정 / 삭제
- 관리자 대시보드
- 이미지 파일 업로드
