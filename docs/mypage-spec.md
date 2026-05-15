# 마이페이지 기획서

**작성일:** 2026-05-15  
**상태:** 승인 대기

---

## 1. 개요

로그인한 사용자만 접근 가능한 `/mypage` 페이지를 추가한다.  
현재 mock 환경(서버 없음) 범위 내에서 실현 가능한 기능으로만 구성한다.

---

## 2. 화면 명세

**URL:** `/mypage`  
**레이아웃:** Header + Footer 포함 (기존 App 레이아웃)  
**접근 제한:** 비로그인 시 `/login`으로 리다이렉트

### 섹션 1 — 프로필 카드

| 항목 | 내용 |
|---|---|
| 아이콘 | 이니셜 기반 아바타 (이름 첫 글자) |
| 이름 | Redux `user.name` |
| 이메일 | Redux `user.email` |

### 섹션 2 — 프로필 수정

- **이름 변경:** 인풋 + 저장 버튼
- 유효성 검사: react-hook-form + Zod (빈 값, 공백 only 입력 불가)
- 저장 시 Redux 상태 + localStorage 동시 업데이트

### 섹션 3 — 계정 관리

- **로그아웃 버튼** — 클릭 시 Redux 초기화 + localStorage 삭제 후 홈(`/`)으로 이동

---

## 3. 변경 파일 목록

| 파일 | 변경 유형 | 내용 |
|---|---|---|
| `src/router/PrivateRoute.jsx` | 신규 | 로그인 필수 라우트 가드 |
| `src/pages/Mypage.jsx` | 신규 | 마이페이지 페이지 컴포넌트 |
| `src/store/authSlice.js` | 수정 | `updateProfile` 액션 추가 |
| `src/router/index.jsx` | 수정 | `/mypage` 라우트 추가 |
| `src/components/layout/Header.jsx` | 수정 | 사용자 이름에 마이페이지 링크 추가 |

---

## 4. 상태 관리

### authSlice 추가 액션

```js
updateProfile(state, action) {
  const { name } = action.payload
  state.user = { ...state.user, name }
  saveUserToStorage(state.user)
}
```

### 셀렉터

기존 `selectUser`를 그대로 사용한다.

---

## 5. 라우팅

```
/mypage  →  Mypage.jsx  (PrivateRoute로 보호, App 레이아웃 포함)
```

`PrivateRoute`는 `isLoggedIn`이 `false`일 때 `/login`으로 리다이렉트한다.

---

## 6. 구현 순서

1. `PrivateRoute.jsx` 작성
2. `authSlice.js`에 `updateProfile` 액션 추가
3. `Mypage.jsx` 작성 (프로필 카드 + 수정 폼 + 로그아웃)
4. `router/index.jsx` 라우트 추가
5. `Header.jsx` 사용자 이름 → 마이페이지 링크로 변경

---

## 7. Out of Scope

- 비밀번호 변경
- 주문 내역 (PRD v2 이후 항목)
- 찜하기 목록
