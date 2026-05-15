# 회원가입 페이지 기획서

**대상 파일:** `src/pages/Signup.jsx`  
**라우트:** `/signup`  
**작성일:** 2026-05-15  
**최종 수정일:** 2026-05-15 (react-hook-form + Zod 적용)  
**참고 문서:** `docs/login-page-spec.md`

---

## 1. 개요

서버 없이 동작하는 mock 기반 회원가입 페이지.  
로그인 페이지와 동일한 풀페이지 레이아웃을 사용하며, 가입 성공 시 자동 로그인 후 홈으로 이동한다.

---

## 2. 레이아웃 구조

```
┌─────────────────────────────────────┐
│  상단 로고 바 (고정 높이 64px)          │
│  🍊 과일가게 · FRESH FRUIT SHOP        │
├─────────────────────────────────────┤
│                                     │
│        회원가입 카드 (중앙 정렬)          │
│  ┌─────────────────────────────┐    │
│  │  🍊 로고 아이콘               │    │
│  │  회원가입 (제목)               │    │
│  │  과일가게의 새 멤버가 되어보세요   │    │
│  │                             │    │
│  │  [서버 에러 메시지 영역]         │    │
│  │                             │    │
│  │  이름 입력                   │    │
│  │  이메일 입력                  │    │
│  │  비밀번호 입력                 │    │
│  │  비밀번호 확인 입력              │    │
│  │                             │    │
│  │  [가입하기 버튼]               │    │
│  │  ─────────────────────────  │    │
│  │  이미 계정이 있으신가요? 로그인    │    │
│  └─────────────────────────────┘    │
│                                     │
│         ← 홈으로 돌아가기              │
└─────────────────────────────────────┘
```

> 로그인 페이지와 레이아웃 구조가 동일하며, 입력 필드 수와 하단 링크 문구만 다르다.

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
const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.'),
  passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: '비밀번호가 일치하지 않습니다.',
})
```

### Redux 상태 (`authSlice`)

| 셀렉터 | 설명 |
|---|---|
| `selectAuthError` | 이미 가입된 이메일 등 서버(mock) 에러 문자열 |
| `selectIsLoggedIn` | 가입 성공(자동 로그인) 감지 → 홈 이동 트리거 |

---

## 4. 입력 필드 목록

필드 목록은 배열(`fields`)로 관리하여 `map()`으로 렌더링한다.

| 순서 | name | label | type | placeholder |
|---|---|---|---|---|
| 1 | `name` | 이름 | `text` | 이름을 입력하세요 |
| 2 | `email` | 이메일 | `email` | 이메일을 입력하세요 |
| 3 | `password` | 비밀번호 | `password` | 4자 이상 입력하세요 |
| 4 | `passwordConfirm` | 비밀번호 확인 | `password` | 비밀번호를 다시 입력하세요 |

---

## 5. 이벤트 흐름

### 입력 변경
- react-hook-form이 내부적으로 처리
- `authError`가 있는 상태에서 입력 시 `clearError()` 디스패치 → 에러 배너 제거

### 폼 제출 (`handleSubmit`)
1. react-hook-form이 Zod 스키마로 유효성 검사 (`refine`으로 비밀번호 확인 포함)
2. 실패 시 `formState.errors`에 필드별 에러 세팅 → 인라인 표시, 제출 중단
3. 성공 시 `signup({ name, email, password })` 디스패치
4. `useEffect`로 `isLoggedIn` 감지 → 홈(`/`)으로 이동 (자동 로그인 포함)
5. 실패 시 `authError` 세팅 → 상단 배너 표시

### 컴포넌트 언마운트 (`useEffect`)
- `clearError()` 디스패치 → 다른 페이지로 이동 시 에러 상태 초기화

---

## 6. 유효성 검사 규칙

Zod 스키마가 유효성 검사를 담당하며, react-hook-form이 에러를 필드에 연결한다.  
`EMAIL_REGEX`는 Zod의 `.email()` 내장 검사로 대체된다.

| 필드 | 조건 | 에러 위치 | 메시지 |
|---|---|---|---|
| `name` | 미입력 | 필드 하단 | 이름을 입력해주세요. |
| `email` | 미입력 | 필드 하단 | 이메일을 입력해주세요. |
| `email` | 형식 오류 | 필드 하단 | 올바른 이메일 형식이 아닙니다. |
| `password` | 4자 미만 (미입력 포함) | 필드 하단 | 비밀번호는 4자 이상이어야 합니다. |
| `passwordConfirm` | 미입력 | 필드 하단 | 비밀번호 확인을 입력해주세요. |
| `passwordConfirm` | `password`와 불일치 | 필드 하단 | 비밀번호가 일치하지 않습니다. (`refine`) |
| mock 인증 실패 (중복 이메일 등) | 카드 상단 배너 | authSlice에서 반환된 에러 메시지 |

> 유효성 에러(`formState.errors`)는 필드 하단 인라인 표시, 인증 에러(`authError`)는 상단 배너로 구분한다.

---

## 7. 로그인 페이지와의 차이점

| 항목 | 로그인 | 회원가입 |
|---|---|---|
| 입력 필드 수 | 2개 (이메일, 비밀번호) | 4개 (이름, 이메일, 비밀번호, 비밀번호 확인) |
| Zod 스키마 | `loginSchema` (빈 값 체크) | `signupSchema` (형식·길이·확인 일치 포함, `refine` 사용) |
| 제출 후 동작 | 로그인 처리 | 가입 처리 + 자동 로그인 |
| 하단 링크 | 회원가입 페이지 링크 | 로그인 페이지 링크 |
| mock 계정 힌트 | 있음 | 없음 |

---

## 8. 디자인 토큰 적용

로그인 페이지와 동일한 토큰을 사용한다. (`docs/login-page-spec.md` 6번 항목 참고)

| 영역 | 적용 클래스 |
|---|---|
| 페이지 배경 | `bg-bg-page` |
| 로고 바 하단 구분선 | `border-b border-border-line` + `boxShadow: 0px 2px 8px rgba(0,0,0,0.08)` |
| 카드 | `bg-white rounded-card px-10 py-10` + `boxShadow: 0px 4px 17px rgba(0,0,0,0.07)` |
| 입력 필드 (정상) | `bg-bg-input border-transparent focus:border-primary` |
| 입력 필드 (에러) | `border-red-400 focus:border-red-400` |
| 가입하기 버튼 | `bg-primary text-white font-bold font-ui rounded-btn` + `boxShadow: 0px 4px 4px rgba(0,0,0,0.15)` |

---

## 9. 라우팅 & 접근 제어

| 조건 | 동작 |
|---|---|
| 가입 성공 | 자동 로그인 처리 후 홈(`/`)으로 이동 |
| 이미 로그인 상태로 `/signup` 접근 | 홈으로 리다이렉트 (`PublicRoute` 처리) |
| 로그인 링크 클릭 | `/login`으로 이동 |
| 홈으로 돌아가기 클릭 | `/`으로 이동 |

---

## 10. 관련 파일

| 파일 | 역할 |
|---|---|
| `src/pages/Signup.jsx` | 회원가입 페이지 컴포넌트 |
| `src/store/authSlice.js` | `signup`, `clearError`, `selectAuthError`, `selectIsLoggedIn` |
| `src/router/PublicRoute.jsx` | 로그인 상태 접근 차단 |
| `src/router/index.jsx` | `/signup` 라우트 등록 |

## 11. 사용 라이브러리

| 라이브러리 | 용도 |
|---|---|
| `react-hook-form` | 폼 상태 관리, 제출 처리, 에러 연결 |
| `zod` | 유효성 검사 스키마 정의 (`refine`으로 비밀번호 확인 처리) |
| `@hookform/resolvers` | react-hook-form과 Zod 연결 (`zodResolver`) |
