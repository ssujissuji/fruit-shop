# 기획안 — 찜하기 기능

**작성일:** 2026-05-15  
**상태:** 검토 대기  
**관련 PRD:** `docs/prd.md` § 9 (v2 고려 사항)

---

## 1. 목적

사용자가 관심 있는 상품을 찜 목록에 저장하고 한 곳에서 모아볼 수 있도록 한다.  
장바구니는 "지금 살 것", 찜 목록은 "나중에 볼 것"을 구분하는 용도다.

---

## 2. 기능 범위

### 포함

- 상품 카드(홈)에서 하트 버튼으로 찜 추가 / 해제
- 상품 상세 페이지에서 하트 버튼으로 찜 추가 / 해제
- 찜 목록 페이지 (`/wishlist`) 신규 추가
- Header에 찜 목록 아이콘 + 찜한 상품 수 뱃지 표시
- localStorage 영속화 (새로고침 후에도 유지)
- 찜 목록 페이지에서 개별 삭제 + 전체 삭제
- 찜 목록 상품 카드에서 상세 페이지 이동 및 장바구니 담기

### 제외

- 로그인 연동 (찜 목록은 비로그인 사용자도 사용 가능)
- 서버 저장 / 계정 간 동기화

---

## 3. 화면별 변경 사항

### 3-1. 홈 화면 (`/`) — 상품 카드 변경

- 카드 우상단에 하트 아이콘 버튼 추가
- 찜된 상품: 하트 채워짐 (filled, 빨간색)
- 찜 안 된 상품: 하트 외곽선 (outline, 회색)
- 클릭 시 찜 추가 / 해제 토글 (페이지 이동 없음)

### 3-2. 상품 상세 페이지 (`/product/:id`) — 액션 영역 변경

- 장바구니 담기 / 구매하기 버튼 옆에 하트 버튼 추가
- 상태 시각화는 홈 카드와 동일

### 3-3. Header — 아이콘 추가

- 장바구니 아이콘 왼쪽에 하트 아이콘 추가
- 찜한 상품이 1개 이상이면 수량 뱃지 표시 (장바구니 뱃지와 동일 스타일)
- 클릭 시 `/wishlist`로 이동

### 3-4. 찜 목록 페이지 (`/wishlist`) — 신규

| 항목 | 내용 |
|---|---|
| 레이아웃 | Header / Footer 포함 (기존 App 레이아웃) |
| 상품 카드 표시 | 이미지, 상품명, 가격 |
| 개별 삭제 | 카드 우상단 X 버튼 또는 하트 해제 |
| 전체 삭제 | "전체 삭제" 버튼 |
| 장바구니 담기 | 각 카드에서 바로 장바구니 추가 가능 |
| 빈 목록 상태 | 안내 문구 + 홈으로 이동 버튼 표시 |
| 접근 권한 | 비로그인 사용자도 접근 가능 |

---

## 4. 상태 관리 설계

### 새로 추가: `wishlistSlice`

**파일 위치:** `src/store/wishlistSlice.js`

**State 구조:**

```js
{
  wishlist: {
    items: [
      {
        id: 1,
        name: "사과",
        price: 3000,
        image: "/images/apple.jpg"
      }
    ]
  }
}
```

**액션 목록:**

| 액션 | 설명 |
|---|---|
| `toggleWishlist(product)` | 찜 목록에 없으면 추가, 있으면 제거 |
| `removeFromWishlist(id)` | 특정 상품 제거 |
| `clearWishlist()` | 전체 비우기 |

**선택자(selector):**

| 선택자 | 설명 |
|---|---|
| `selectWishlistItems` | 전체 찜 목록 반환 |
| `selectIsWishlisted(id)` | 특정 상품 찜 여부 반환 |
| `selectWishlistCount` | 찜 목록 상품 수 반환 |

### localStorage 영속화

- `store/index.js`에서 `subscribe`를 사용해 `wishlist` 상태를 localStorage에 동기화
- 키: `"wishlist"`
- 스토어 초기화 시 localStorage에서 상태 불러오기

---

## 5. 라우팅 변경

`src/router/index.jsx`에 아래 라우트 추가:

```
/wishlist  →  Wishlist.jsx  (App 레이아웃 포함)
```

---

## 6. 파일 추가 / 변경 목록

### 새로 추가

| 파일 | 설명 |
|---|---|
| `src/store/wishlistSlice.js` | 찜 상태 관리 slice |
| `src/pages/Wishlist.jsx` | 찜 목록 페이지 |

### 변경

| 파일 | 변경 내용 |
|---|---|
| `src/store/index.js` | wishlistSlice 등록, localStorage 영속화 추가 |
| `src/router/index.jsx` | `/wishlist` 라우트 추가 |
| `src/components/layout/Header.jsx` | 하트 아이콘 + 뱃지 추가 |
| `src/pages/Home.jsx` | 상품 카드에 하트 버튼 추가 |
| `src/pages/ProductDetail.jsx` | 하트 버튼 추가 |
| `docs/prd.md` | 찜하기 기능 화면 및 기능 명세 추가 |
| `CHANGELOG.md` | [Unreleased] 섹션에 추가 |

---

## 7. 완료 조건 (Acceptance Criteria)

- [ ] 홈 화면 상품 카드에서 하트 버튼 클릭 시 찜 추가 / 해제된다
- [ ] 상품 상세 페이지에서 하트 버튼 클릭 시 찜 추가 / 해제된다
- [ ] 찜된 상품은 하트가 빨간색으로 채워지고, 아닌 상품은 외곽선으로 표시된다
- [ ] Header 하트 아이콘에 찜한 상품 수 뱃지가 표시된다
- [ ] 찜 목록 페이지(`/wishlist`)에서 찜한 상품 목록이 표시된다
- [ ] 찜 목록 페이지에서 개별 삭제가 동작한다
- [ ] 찜 목록 페이지에서 전체 삭제가 동작한다
- [ ] 찜 목록 페이지에서 장바구니 담기가 동작한다
- [ ] 찜 목록 페이지에서 상품 카드 클릭 시 상세 페이지로 이동한다
- [ ] 빈 찜 목록 상태에서 안내 UI가 표시된다
- [ ] 새로고침 후에도 찜 목록이 유지된다 (localStorage 영속화)
- [ ] 비로그인 상태에서도 찜 기능이 동작한다

---

## 8. 구현 순서

1. `wishlistSlice.js` 작성 및 store 등록 + localStorage 영속화
2. Header에 하트 아이콘 + 뱃지 추가, `/wishlist` 라우트 등록
3. 홈 화면 상품 카드에 하트 버튼 추가
4. 상품 상세 페이지에 하트 버튼 추가
5. 찜 목록 페이지(`Wishlist.jsx`) 구현
6. PRD, CHANGELOG, WORK.md 문서 업데이트
