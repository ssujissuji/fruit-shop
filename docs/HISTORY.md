# HISTORY.md

완료된 작업의 전체 이력을 시간순으로 기록합니다.

---

## 2026-05-13

### 프로젝트 초기 세팅
- `README.md` 작성

### PRD 작성
- `docs/prd.md` v1.0 최초 작성
- 목표, 화면 목록, 화면별 기능 명세, 상태 관리, 완료 조건 정의

### 과일 쇼핑몰 초기 구현 (v1.0)
- **주요 변경 파일:** `src/pages/Home.jsx`, `src/pages/ProductDetail.jsx`, `src/pages/Cart.jsx`, `src/components/layout/Header.jsx`, `src/components/layout/Footer.jsx`, `src/components/ui/ProductCard.jsx`, `src/components/ui/Slider.jsx`, `src/store/cartSlice.js`, `src/router/index.jsx`, `src/data/products.json`
- 홈 화면 구현: 배너 슬라이더(자동 슬라이드 3초, 좌우 버튼, 인디케이터) + 상품 목록(반응형 그리드 2/3/4열)
- 상품 상세 페이지 구현: 상품 정보 표시, 수량 선택, 장바구니 담기, 구매하기 버튼
- 장바구니 페이지 구현: 상품 목록, 수량 관리, 삭제, 합계, 빈 장바구니 상태
- Redux Toolkit으로 장바구니 전역 상태 관리 (`cartSlice`)
- React Router v7 `createBrowserRouter` 기반 라우팅 설정
- Playwright E2E 테스트 26개 작성 (홈 / 상품 상세 / 장바구니 전 시나리오)

---

## 2026-05-14

### 로그인 / 회원가입 기능 추가 (v1.1)
- **주요 변경 파일:** `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/store/authSlice.js`, `src/components/layout/Header.jsx`, `src/router/PublicRoute.jsx`, `src/router/index.jsx`, `docs/prd.md`
- `authSlice` 추가: mock 인증, localStorage 영속화
- 로그인 페이지 구현: 이메일/비밀번호 입력, 빈 값 유효성 검사, 상단 에러 배너
- 회원가입 페이지 구현: 이름/이메일/비밀번호/확인 입력, 이메일 형식·비밀번호 길이·확인 일치 유효성 검사
- `PublicRoute`로 로그인 상태에서 `/login`, `/signup` 접근 차단 (홈 리다이렉트)
- Header에 로그인/로그아웃 버튼 추가 (로그인 상태에 따라 전환)
- PRD v1.1 업데이트: 인증 기능 명세 반영

### 디자인 토큰 적용 및 전체 UI 스타일 통일
- **주요 변경 파일:** `src/index.css`, `src/App.jsx`, `src/components/ui/Slider.jsx`, `src/components/ui/ProductCard.jsx`, `src/pages/Home.jsx`
- `index.css` `@theme`에 색상·폰트·border-radius·box-shadow 토큰 정의
- Slider, ProductCard, Home, App 전체에 토큰 기반 스타일 적용
- 슬라이더 배경·버튼·인디케이터 디자인 개편

### 디자인 가이드 문서 작성
- **주요 변경 파일:** `docs/design.md`
- 색상 토큰, 타이포그래피, 간격·레이아웃, 컴포넌트 스펙, 반응형 브레이크포인트 정리
- 피그마 → 코드 변환 노트 포함

### CLAUDE.md 및 프로젝트 문서 정비
- `docs/CHANGELOG.md` 추가 (릴리즈 기준 변경 이력 관리)
- `CLAUDE.md` fruit-shop 프로젝트용으로 이동 및 아키텍처 업데이트
- `design.md` → `docs/design.md`로 이동

### Zod 스키마 파일 분리
- **주요 변경 파일:** `src/schemas/authSchemas.js` (신규), `src/pages/Login.jsx`, `src/pages/Signup.jsx`
- `src/schemas/authSchemas.js` 생성 — `loginSchema`, `signupSchema` 분리 관리
- `Login.jsx`, `Signup.jsx`에서 인라인 스키마 제거 후 import로 교체

### Login / Signup 폼 라이브러리 적용 리팩토링
- **주요 변경 파일:** `src/pages/Login.jsx`, `src/pages/Signup.jsx`
- `useState(form/touched)` + 수동 에러 계산 제거
- `useForm` + `zodResolver` 기반으로 교체
- `loginSchema`: 이메일·비밀번호 빈 값 검사
- `signupSchema`: 이메일 형식·비밀번호 길이·확인 일치(`refine`) 검사
- `watch()`로 입력 변경 감지 → `authError` 클리어
- `fields` 배열 컴포넌트 외부로 이동 (렌더링마다 재생성 방지)

### PRD 미구현 항목 수정
- **주요 변경 파일:** `src/pages/ProductDetail.jsx`, `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/store/cartSlice.js`, `src/components/ui/ProductCard.jsx`
- `ProductDetail.jsx`에 수량 선택 UI 추가: `-`/`+` 버튼, 최소 1 / 최대 재고 수량 제한
- `cartSlice.addToCart`가 `{ product, quantity }` 형태를 받도록 수정, quantity 기본값 1
- `ProductCard.jsx` addToCart 호출 형태 변경 (payload 구조 통일)
- `Login.jsx` / `Signup.jsx`에 `useEffect` + `selectIsLoggedIn` 감지 → 로그인 성공 시 홈으로 이동 (`navigate('/', { replace: true })`)

### 기획서 문서 작성 (소급)
- **주요 변경 파일:** `docs/login-page-spec.md`, `docs/signup-page-spec.md`
- 로그인 페이지 기획서 작성: 레이아웃 구조, 상태, 이벤트 흐름, 유효성 검사 규칙, 디자인 토큰, 라우팅
- 회원가입 페이지 기획서 작성: 로그인 기획서 구조 기반, 고유 항목(필드 목록, 확장된 유효성 검사, 로그인 페이지와의 차이점) 추가
