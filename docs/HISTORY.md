# HISTORY.md

완료된 작업의 전체 이력을 시간순으로 기록합니다.

---

## 2026-05-15

### 찜하기 기능 구현
- **주요 변경 파일:** `src/store/wishlistSlice.js` (신규), `src/pages/Wishlist.jsx` (신규), `src/store/index.js`, `src/router/index.jsx`, `src/components/layout/Header.jsx`, `src/components/ui/ProductCard.jsx`, `src/pages/ProductDetail.jsx`
- `wishlistSlice.js` 신규 생성: `toggleWishlist` / `removeFromWishlist` / `clearWishlist` 액션, localStorage 영속화, 선택자 3개 (`selectWishlistItems`, `selectIsWishlisted`, `selectWishlistCount`)
- `store/index.js`에 `wishlistReducer` 등록
- `router/index.jsx`에 `/wishlist` 라우트 추가
- `Header.jsx`에 하트 아이콘 + 찜 수 뱃지 추가 (`/wishlist` 이동)
- `ProductCard.jsx`에 카드 우상단 하트 버튼 추가 (찜 상태 시각화: 채워진 빨강 / 외곽선 회색)
- `ProductDetail.jsx`에 구매 버튼 영역 왼쪽에 하트 버튼 추가
- `Wishlist.jsx` 신규 구현: 찜 목록 그리드, 개별 삭제, 전체 삭제, 장바구니 담기, 빈 상태 안내 UI
- 비로그인 사용자도 사용 가능, 새로고침 후에도 localStorage로 찜 목록 유지
- 기획서 `docs/wishlist-spec.md` 작성

---

### 상품 검색 기능 구현
- **주요 변경 파일:** `src/hooks/useDebounce.js` (신규), `src/hooks/useProductFilter.js` (신규), `src/pages/Home.jsx`, `e2e/search.spec.js` (신규)
- `useDebounce` 훅: 범용 디바운스 훅, 300ms 지연 후 값 반영
- `useProductFilter` 훅: 카테고리 + 검색어 AND 필터, `useMemo`로 재계산 최소화
- `Home.jsx` 상태 구조 변경: `inputValue`(입력창 바인딩) / `filterQuery`(실제 필터 기준) / `isComposing`(IME 플래그) 분리
- 한글 IME 조합 이슈 처리: `onCompositionStart` / `onCompositionEnd`로 마지막 글자 중복 방지
- Enter 키 즉시 실행: 디바운스 우회해 `filterQuery` 직접 갱신, 조합 중 Enter는 무시
- X 버튼으로 `inputValue` + `filterQuery` 동시 초기화
- 빈 결과 시 "검색 결과가 없습니다." 안내 문구 표시
- 카테고리 배지 UI 추가: 카테고리 선택 시 검색창 왼쪽에 카테고리 색상 배지 표시, 배지 클릭으로 카테고리 전체 초기화
- e2e 테스트 17개 추가 (`e2e/search.spec.js`): 한글/영문 검색, 대소문자, 빈 결과, X 버튼, Enter 즉시 실행, 카테고리+검색어 AND 조건, 카테고리 배지(3개)

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

---

## 2026-05-15

### 문서 인프라 초기 작성
- **주요 변경 파일:** `docs/WORK.md`, `docs/HISTORY.md`, `docs/prd.md`
- `WORK.md` 신규 생성: 현재 작업 현황, 결정 사항, v2 고려 사항 관리
- `HISTORY.md` 신규 생성: git 이력 기반으로 완료 작업 소급 정리
- `prd.md` 완료 조건 체크박스 전체 업데이트 (PRD 검증 결과 반영)

### PRD 검증 및 미구현 항목 수정
- **주요 변경 파일:** `src/pages/ProductDetail.jsx`, `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/store/cartSlice.js`, `src/components/ui/ProductCard.jsx`
- PRD 완료 조건 14개 전수 검증 → 3개 미구현 항목 발견 및 수정
- `ProductDetail.jsx` 수량 선택 UI 추가: `-`/`+` 버튼, 최소 1 / 최대 재고 수량 제한
- `cartSlice.addToCart` payload를 `{ product, quantity }` 구조로 변경, `ProductCard` 호출부 통일
- `Login.jsx` / `Signup.jsx` 로그인 성공 후 홈 이동 추가 (`useEffect` + `selectIsLoggedIn` → `navigate('/')`)

### Login / Signup 폼 react-hook-form + Zod 리팩토링
- **주요 변경 파일:** `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/schemas/authSchemas.js` (신규)
- `useState(form/touched)` 및 수동 유효성 로직 전면 제거
- `useForm` + `zodResolver` 기반으로 교체
- `src/schemas/authSchemas.js` 생성: `loginSchema`, `signupSchema` 분리 관리
- `watch()` 대신 `registerField()` 헬퍼로 onChange 래핑 (React Compiler 경고 해소)

### 기획서 react-hook-form + Zod 내용 반영
- **주요 변경 파일:** `docs/login-page-spec.md`, `docs/signup-page-spec.md`
- 상태 섹션: `useState` → `useForm` + Zod 스키마로 업데이트
- 이벤트 흐름·유효성 검사 섹션: 라이브러리 기반 방식으로 재작성
- 사용 라이브러리 섹션 추가

### 마이페이지 구현
- **주요 변경 파일:** `src/pages/Mypage.jsx` (신규), `src/router/PrivateRoute.jsx` (신규), `src/store/authSlice.js`, `src/router/index.jsx`, `src/components/layout/Header.jsx`
- `PrivateRoute.jsx` 추가: 비로그인 시 `/login`으로 리다이렉트
- `authSlice`에 `updateProfile` 액션 추가: 이름 변경 후 Redux 상태 + localStorage 동기화
- `Mypage.jsx` 구현: 프로필 카드(이니셜 아바타, 이름, 이메일), 이름 수정 폼(react-hook-form + Zod), 로그아웃 버튼
- `/mypage` 라우트 추가 (`PrivateRoute`로 보호)
- Header 사용자 이름을 `/mypage` 링크로 변경

### 마이페이지 기획서 작성
- **주요 변경 파일:** `docs/mypage-spec.md` (신규)
- 화면 명세, 변경 파일 목록, 상태 관리, 라우팅, 구현 순서 정리

### 관리자 상품 등록 기능 구현

- **주요 변경 파일:** `src/store/authSlice.js`, `src/store/productSlice.js` (신규), `src/store/index.js`, `src/router/AdminRoute.jsx` (신규), `src/router/index.jsx`, `src/pages/AdminProductNew.jsx` (신규), `src/schemas/productSchema.js` (신규), `src/constants/emojis.js` (신규), `src/pages/Home.jsx`, `src/pages/ProductDetail.jsx`, `src/components/layout/Header.jsx`, `src/pages/Login.jsx`, `docs/PRD.md`, `docs/WORK.md`, `docs/admin-product-spec.md` (신규)
- `authSlice` admin 계정 추가: `admin@fruit.com / admin1234`, `isAdmin` 플래그 방식으로 역할 구분, `selectIsAdmin` selector 추가
- `productSlice` 신규 생성: `products.json` 초기 데이터 로드, `addProduct` 액션(id 자동 부여), localStorage 영속화 (`products` 키)
- `Home.jsx` / `ProductDetail.jsx`: `products.json` 직접 import → `selectProducts` selector로 교체 (등록 상품 즉시 반영)
- `AdminRoute.jsx` 신규: 미로그인 → `/login`, 비admin → `/` 리다이렉트
- `/admin/product/new` 라우트 추가 (`AdminRoute`로 보호)
- `productSchema.js` 신규: Zod 유효성 스키마 (9개 필드), 중량은 `weightValue`(number) + `weightUnit`(g/kg) 분리 후 submit 시 합산
- `emojis.js` 신규: 과일 이모지 16종 상수
- `AdminProductNew.jsx` 신규: 상품 등록 폼, 이모지 드롭다운, 중량 숫자+단위 드롭다운, react-hook-form + Zod 유효성 검사, 등록 후 홈 이동
- `Header.jsx`: `isAdmin` 시 🛠 상품 등록 링크 표시
- `Login.jsx`: 관리자 계정 힌트(`admin@fruit.com / admin1234`) 추가
- `PRD.md` v1.3 업데이트: 화면 목록·기능 명세·라우팅·완료 조건·Redux Store 구조 반영
- `admin-product-spec.md` 신규: 전체 명세 문서 작성

---

### e2e 테스트 추가
- **주요 변경 파일:** `e2e/login.spec.js` (신규), `e2e/signup.spec.js` (신규), `e2e/product-detail.spec.js`, `e2e/home.spec.js`
- `login.spec.js` 신규: 유효성 에러, 인증 에러, 로그인 성공, 접근 제어, 링크 (9개)
- `signup.spec.js` 신규: 유효성 에러, 중복 이메일, 가입 성공, 접근 제어, 링크 (11개)
- `product-detail.spec.js` 수량 관련 4개 추가: 초기값, +/- 버튼 동작, 2개 담기
- `home.spec.js` 섹션 타이틀 수정 반영
- 총 테스트 26개 → 50개
