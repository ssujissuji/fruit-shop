# CHANGELOG

이 프로젝트의 주요 변경 사항을 버전별로 기록합니다.

---

## [Unreleased]

### Added

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
