# CHANGELOG

이 프로젝트의 주요 변경 사항을 버전별로 기록합니다.

---

## [Unreleased]

### Added

- 관리자 상품 관리 목록 페이지 (`/admin/products`) — 전체 상품 테이블, 수정/삭제 버튼
- 관리자 상품 수정 페이지 (`/admin/product/:id/edit`) — 기존 데이터 pre-fill, 수정 완료 후 목록으로 이동
- `productSlice.updateProduct` / `deleteProduct` 액션 추가 — id 기준 수정·삭제, localStorage 동기화
- `ProductForm` 공용 컴포넌트 — 등록/수정 폼 로직 공유, `defaultValues` / `submitLabel` props로 분기
- e2e 테스트 14개 추가 (`e2e/admin-product.spec.js`) — 접근 제어(3), 목록 표시(1), 등록(3), 수정(2), 삭제(2), 영속화(2), 없는 id 리다이렉트(1)
- 관리자 상품 등록 페이지 (`/admin/product/new`) — admin 계정 전용, `AdminRoute`로 접근 제어
- `productSlice` — 상품 전역 상태 관리 (`products.json` 초기 데이터 + localStorage 영속화), `addProduct` 액션
- `AdminRoute` — `isAdmin` 플래그 기반 라우트 가드 (미로그인 → `/login`, 비admin → `/`)
- admin 계정 추가 (`admin@fruit.com / admin1234`), `isAdmin` 필드, `selectIsAdmin` selector
- Header에 admin 로그인 시 🛠 상품 관리 링크 표시 (`/admin/products`)
- Login 페이지에 관리자 계정 힌트 추가
- 상품 등록 폼: 이모지 드롭다운(16종), 중량 숫자 + g/kg 단위 드롭다운, react-hook-form + Zod 유효성 검사
- 찜하기 기능 — 상품 카드/상세 페이지 하트 버튼, 찜 목록 페이지 (`/wishlist`), localStorage 영속화
- `wishlistSlice` — 찜 상태 관리 (toggle / remove / clear), 비로그인 사용자도 사용 가능
- Header 하트 아이콘 + 찜 수 뱃지 추가
- 상품 검색 — 홈 화면 상품명(한글/영문) 실시간 필터링, 카테고리 필터와 AND 조건 적용
- `useDebounce` 훅 — 범용 디바운스 훅 (300ms)
- `useProductFilter` 훅 — 카테고리 + 검색어 복합 필터 (useMemo)
- 마이페이지 (`/mypage`) — 프로필 카드(이니셜 아바타, 이름, 이메일), 이름 수정, 로그아웃
- `PrivateRoute` — 비로그인 시 `/login`으로 리다이렉트
- `authSlice.updateProfile` — 이름 변경 후 Redux 상태 + localStorage 동기화
- `src/schemas/authSchemas.js` — Zod 스키마 파일 분리 (`loginSchema`, `signupSchema`)
- 상품 상세 페이지 수량 선택 UI — `-`/`+` 버튼, 최소 1 / 최대 재고 수량 제한
- 로그인·회원가입 성공 후 홈(`/`) 자동 이동
- e2e 테스트 24개 추가 — 로그인(9), 회원가입(11), 상품 상세 수량(4) / 총 50개

### Changed

- Header 사용자 이름을 마이페이지(`/mypage`) 링크로 변경
- Login·Signup 폼을 react-hook-form + Zod 기반으로 리팩토링
  - `useState(form/touched)` 및 수동 유효성 로직 제거
  - `registerField()` 헬퍼로 onChange 래핑 (React Compiler 경고 해소)
- `cartSlice.addToCart` payload 구조를 `{ product, quantity }` 형태로 변경
- `CHANGELOG.md` 위치를 `docs/` → 프로젝트 루트로 이동

### Fixed

- admin 등록 상품 카드에서 선택한 이모지 대신 다른 이모지가 표시되던 문제 (`ProductCard` 이모지/URL 분기 처리)
- 존재하지 않는 상품 id로 수정 페이지 접근 시 `/admin/products` 리다이렉트가 동작하지 않던 문제 (`useEffect`로 이전)
- 상품 등록/수정 폼의 숫자 필드 유효성 에러 메시지가 표시되지 않던 문제 (Zod v4 `z.coerce.number()` 적용)
- 상품 상세 페이지에서 수량 선택 없이 항상 1개만 장바구니에 담기던 문제
- 로그인·회원가입 성공 후 페이지가 이동하지 않던 문제

---

## [Unreleased] - 2026-05-14

### Added

- 로그인 페이지 (`/login`) — 이메일/비밀번호 입력, 유효성 검사, mock 인증
- 회원가입 페이지 (`/signup`) — 이름/이메일/비밀번호 입력, 유효성 검사, 자동 로그인
- `authSlice` — Redux 기반 인증 상태 관리, localStorage 영속화
- `PublicRoute` — 로그인 상태에서 `/login`, `/signup` 접근 시 홈으로 리다이렉트
- Header에 로그인/로그아웃 버튼 추가

### Changed

- PRD v1.1로 업데이트 — 로그인/회원가입 명세 추가
- 디자인 토큰 적용 (색상, 폰트, 반경, 그림자) — `index.css` @theme 정의
- Slider, ProductCard, Home, App 스타일 디자인 토큰 기반으로 통일

---

## [Unreleased] - 2026-05-13

### Added

- 홈 화면 — 배너 슬라이더 (자동 재생, 수동 전환) + 과일 상품 목록
- 상품 상세 페이지 — 수량 선택, 장바구니 담기, 즉시 구매
- 장바구니 페이지 — 수량 관리, 상품 삭제, 합계 금액 표시
- `cartSlice` — Redux 기반 장바구니 상태 관리
- 카테고리 필터 (전체 / 국내산 / 수입산)
- Header — 로고, 장바구니 아이콘 + 수량 뱃지
- Footer
