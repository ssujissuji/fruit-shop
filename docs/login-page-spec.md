# 로그인 페이지 기획서

**대상 파일:** `src/pages/Login.jsx`  
**라우트:** `/login`  
**작성일:** 2026-05-15  
**최종 수정일:** 2026-05-15 (react-hook-form + Zod 적용)

---

## 1. 개요

서버 없이 동작하는 mock 인증 기반의 로그인 페이지.  
Header / Footer 없이 독립적인 풀페이지 레이아웃으로 구성한다.

---

## 2. 레이아웃 구조

```
┌─────────────────────────────────────┐
│  상단 로고 바 (고정 높이 64px)         │
│  🍊 과일가게 · FRESH FRUIT SHOP       │
├─────────────────────────────────────┤
│                                     │
│         로그인 카드 (중앙 정렬)         │
│  ┌─────────────────────────────┐    │
│  │  🍊 로고 아이콘               │    │
│  │  로그인 (제목)                │    │
│  │  신선한 과일이 기다리고 있어요   │    │
│  │                             │    │
│  │  [서버 에러 메시지 영역]        │    │
│  │                             │    │
│  │  이메일 입력                  │    │
│  │  비밀번호 입력                 │    │
│  │                             │    │
│  │  [로그인 버튼]                │    │
│  │  ─────────────────────────  │    │
│  │  아직 계정이 없으신가요? 회원가입 │    │
│  │  힌트: test@fruit.com / 1234 │    │
│  └─────────────────────────────┘    │
│                                     │
│         ← 홈으로 돌아가기              │
└─────────────────────────────────────┘
```

---

## 3. 상태 (State)

### react-hook-form (`useForm`)

`useState`로 직접 관리하던 `form`, `touched` 상태를 react-hook-form이 대체한다.

| 항목 | 설명 |
|---|---|
| `register` | 각 입력 필드를 폼에 등록 |
| `handleSubmit` | 유효성 검사 통과 후 제출 콜백 실행 |
| `formState.errors` | Zod 스키마 기반 필드별 에러 객체 |
| `resolver` | `zodResolver`로 Zod 스키마 연결 |

### Zod 스키마

```js
const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
})
```

### Redux 상태 (`authSlice`)

| 셀렉터 | 설명 |
|---|---|
| `selectAuthError` | 서버(mock) 인증 실패 에러 문자열 |
| `selectIsLoggedIn` | 로그인 성공 감지 → 홈 이동 트리거 |

---

## 4. 이벤트 흐름

### 입력 변경
- react-hook-form이 내부적으로 처리
- `authError`가 있는 상태에서 입력 시 `clearError()` 디스패치 → 에러 배너 제거  
  (`onChange` 옵션 또는 `useEffect`로 처리)

### 폼 제출 (`handleSubmit`)
1. react-hook-form이 Zod 스키마로 유효성 검사
2. 실패 시 `formState.errors`에 필드별 에러 세팅 → 인라인 표시, 제출 중단
3. 성공 시 `login({ email, password })` 디스패치
4. `useEffect`로 `isLoggedIn` 감지 → 홈(`/`)으로 이동
5. 실패 시 `authError` 세팅 → 상단 배너 표시

### 컴포넌트 언마운트 (`useEffect`)
- `clearError()` 디스패치 → 다른 페이지로 이동 시 에러 상태 초기화

---

## 5. 유효성 검사 규칙

Zod 스키마가 유효성 검사를 담당하며, react-hook-form이 에러를 필드에 연결한다.

| 필드 | 조건 | 에러 위치 | 메시지 |
|---|---|---|---|
| `email` | 미입력 | 필드 하단 | 이메일을 입력해주세요. |
| `password` | 미입력 | 필드 하단 | 비밀번호를 입력해주세요. |
| (mock 인증 실패) | 이메일/비밀번호 불일치 | 카드 상단 배너 | authSlice에서 반환된 에러 메시지 |

> 유효성 에러(`formState.errors`)는 인라인 표시, 인증 에러(`authError`)는 상단 배너로 구분한다.

---

## 6. 디자인 토큰 적용

### 레이아웃

| 영역 | 적용 클래스 |
|---|---|
| 페이지 배경 | `bg-bg-page` |
| 로고 바 하단 구분선 | `border-b border-border-line` + `boxShadow: 0px 2px 8px rgba(0,0,0,0.08)` |
| 카드 | `bg-white rounded-card px-10 py-10` + `boxShadow: 0px 4px 17px rgba(0,0,0,0.07)` |

### 입력 필드

| 상태 | 적용 클래스 |
|---|---|
| 기본 / 정상 | `bg-bg-input border-transparent focus:border-primary` |
| 에러 | `border-red-400 focus:border-red-400` |

### 버튼

```
bg-primary text-white font-bold font-ui rounded-btn
hover:opacity-90 active:scale-[0.98]
boxShadow: 0px 4px 4px rgba(0,0,0,0.15)
```

### 타이포그래피

| 요소 | 폰트 | 크기 | 굵기 |
|---|---|---|---|
| 로그인 제목 | `font-price` (Rubik) | 24px | 600 |
| 부제 / 안내 문구 | `font-body` (Roboto) | text-sm | 400 |
| 레이블 | `font-ui` (Nunito) | text-sm | 600 |
| 버튼 | `font-ui` (Nunito) | text-sm | 700 |
| 에러 메시지 | `font-body` (Roboto) | text-xs / text-sm | 400 |

---

## 7. 라우팅 & 접근 제어

| 조건 | 동작 |
|---|---|
| 로그인 성공 | 홈(`/`)으로 이동 |
| 이미 로그인 상태로 `/login` 접근 | 홈으로 리다이렉트 (`PublicRoute` 처리) |
| 회원가입 링크 클릭 | `/signup`으로 이동 |
| 홈으로 돌아가기 클릭 | `/`으로 이동 |

---

## 8. 연습용 mock 계정

| 필드 | 값 |
|---|---|
| 이메일 | `test@fruit.com` |
| 비밀번호 | `1234` |

페이지 하단에 힌트로 노출한다.

---

## 9. 관련 파일

| 파일 | 역할 |
|---|---|
| `src/pages/Login.jsx` | 로그인 페이지 컴포넌트 |
| `src/store/authSlice.js` | `login`, `clearError`, `selectAuthError`, `selectIsLoggedIn` |
| `src/router/PublicRoute.jsx` | 로그인 상태 접근 차단 |
| `src/router/index.jsx` | `/login` 라우트 등록 |

## 10. 사용 라이브러리

| 라이브러리 | 용도 |
|---|---|
| `react-hook-form` | 폼 상태 관리, 제출 처리, 에러 연결 |
| `zod` | 유효성 검사 스키마 정의 |
| `@hookform/resolvers` | react-hook-form과 Zod 연결 (`zodResolver`) |
