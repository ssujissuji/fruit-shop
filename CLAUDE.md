# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 작업 지침서입니다.

## 1. 프로젝트 요약

이 프로젝트는 React 기반 과일 쇼핑몰 애플리케이션이다.

제품 요구사항, 화면별 기능 명세, 완료 조건은 `docs/PRD.md`를 기준으로 한다.

디자인 기준은 `docs/DESIGN.md`를 기준으로 한다.

현재 작업 상태는 `docs/WORK.md`를 기준으로 한다.

## 개발 명령어

### 프로젝트 최초 생성 (한 번만 실행)

```bash
# Vite + React 프로젝트 생성
npm create vite@latest fruit-shop -- --template react

cd fruit-shop

# 기본 의존성 설치
npm install

# Tailwind CSS v4 설치 (Vite 플러그인 방식, init 명령 불필요)
npm install -D tailwindcss @tailwindcss/vite

# React Router 설치 (createBrowserRouter 방식)
npm install react-router-dom

# Redux Toolkit 설치
npm install @reduxjs/toolkit react-redux
```

### 일반 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview

# 린트
npm run lint
```

## 아키텍처

```
fruit-shop/
├── public/
│   └── images/           # 상품 이미지 파일 저장 경로
├── src/
│   ├── components/       # 재사용 가능한 공통 UI 컴포넌트
│   │   ├── layout/       # Header, Footer 등 레이아웃 컴포넌트
│   │   └── ui/           # Button, Card 등 기본 UI 컴포넌트
│   ├── pages/            # 라우팅 단위 페이지 컴포넌트
│   │   ├── Home.jsx      # 슬라이더 + 과일 상품 목록
│   │   ├── ProductDetail.jsx  # 상품 상세 + 장바구니/구매 버튼
│   │   ├── Cart.jsx      # 장바구니 페이지
│   │   ├── Login.jsx     # 로그인 페이지 (Header/Footer 없음)
│   │   └── Signup.jsx    # 회원가입 페이지 (Header/Footer 없음)
│   ├── store/            # Redux Toolkit 전역 상태 관리
│   │   ├── index.js      # store 설정
│   │   ├── cartSlice.js  # 장바구니 slice
│   │   └── authSlice.js  # 인증 slice (localStorage 영속화)
│   ├── data/
│   │   └── products.json # 과일 상품 기초 데이터 (JSON)
│   ├── router/
│   │   ├── index.jsx     # createBrowserRouter 라우터 설정
│   │   └── PublicRoute.jsx  # 비로그인 전용 라우트 가드
│   └── utils/            # 공통 유틸리티 함수
```

## 주요 기술 스택

- **빌드 도구:** Vite
- **프레임워크:** React 19
- **언어:** JavaScript (ES2022+)
- **스타일링:** Tailwind CSS v4
- **라우팅:** React Router v7 (createBrowserRouter — Data Router API)
- **상태 관리:** Redux Toolkit (전역 상태, props drilling 최소화)
- **패키지 매니저:** npm

## 코드 규칙

### 네이밍 규칙

- 컴포넌트 파일명 및 함수명: `PascalCase` (예: `ProductCard.jsx`)
- 일반 변수, 함수, 파일명: `camelCase` (예: `cartSlice.js`)
- 상수: `UPPER_SNAKE_CASE` (예: `MAX_CART_COUNT`)
- CSS 클래스: Tailwind 유틸리티 클래스 사용, 커스텀 클래스는 `kebab-case`

### 컴포넌트 규칙

- 컴포넌트는 반드시 함수형으로 작성한다
- 하나의 파일에는 하나의 컴포넌트만 작성한다
- props는 구조 분해 할당으로 받는다
- 컴포넌트 내부 로직이 복잡해지면 커스텀 훅으로 분리한다

### 상태 관리 규칙

- 전역 상태는 Redux Toolkit slice로 관리한다
- 컴포넌트 내부 UI 상태(모달 열림 여부 등)는 `useState`로 관리한다
- props drilling이 2단계 이상 발생하면 Redux로 전환한다

### 임포트 순서

1. 외부 라이브러리 (react, react-router-dom 등)
2. 내부 store / context
3. 내부 컴포넌트
4. 유틸리티 / 데이터
5. 스타일 / 이미지

### 커밋 메시지 규칙

커밋 메시지는 아래 형식을 따른다.

```
<타입>: <변경 내용 요약>

예시)
feat: 장바구니 담기 기능 추가
fix: 상품 상세 페이지 이미지 경로 오류 수정
style: 홈 화면 슬라이더 레이아웃 조정
refactor: cartSlice 리듀서 로직 분리
```

| 타입       | 설명                      |
| ---------- | ------------------------- |
| `feat`     | 새로운 기능 추가          |
| `fix`      | 버그 수정                 |
| `style`    | UI/스타일 변경            |
| `refactor` | 기능 변화 없는 코드 개선  |
| `chore`    | 설정, 패키지 등 기타 변경 |

### 브랜치 전략 (GitHub Flow 기반)

```
main          # 배포 가능한 안정 브랜치 (직접 커밋 금지)
└── develop   # 개발 통합 브랜치
    ├── feat/슬라이더-컴포넌트
    ├── feat/상품-상세-페이지
    ├── feat/장바구니-기능
    └── fix/이미지-경로-오류
```

- `main`: 최종 배포 브랜치. PR + 리뷰 후에만 병합한다.
- `develop`: 기능 개발의 통합 기준 브랜치.
- `feat/<기능명>`: 새 기능 개발 시 develop에서 분기한다.
- `fix/<버그명>`: 버그 수정 시 develop에서 분기한다.
- 작업 완료 후 develop으로 Pull Request를 생성하여 병합한다.

## 작업 규칙

- 파일 생성, 수정, 삭제가 필요한 경우 실행 전 변경 내용을 먼저 설명하고 승인을 받은 후 진행한다.
- 여러 작업이 있을 경우 한 번에 처리하지 않고 단계별로 나누어 각 단계마다 승인을 받는다.
- 작업 중 계획이 변경될 경우 변경 사항을 설명하고 재승인을 받는다.

## WORK.md 관리 규칙

`docs/WORK.md`는 **현재 진행 중이거나 앞으로 할 작업만** 관리한다.

### Claude가 반드시 해야 하는 행동

1. **작업 시작 전**: `docs/WORK.md`의 `## 진행 예정`에 작업 항목을 추가한다.
2. **작업 완료 후**:
   - 완료 항목을 `docs/WORK.md`에서 **제거**한다.
   - 해당 항목을 `docs/HISTORY.md`로 **이동**한다 (날짜 포함).
3. **기술적 결정이 생겼을 때**: `docs/WORK.md`의 `## 결정 사항`에 항목과 이유를 기록한다.

### WORK.md에 두지 않는 것

- 완료된 작업 내역 → `docs/HISTORY.md`로 이동
- 기능 요구사항 → `docs/prd.md` 참조

## HISTORY.md 관리 규칙

`docs/HISTORY.md`는 **완료된 작업의 전체 이력**을 담는다.

### Claude가 반드시 해야 하는 행동

- 작업 완료 시 즉시 `docs/HISTORY.md`에 기록한다.
- 기록 형식: **날짜 / 작업 제목 / 주요 변경 파일 및 내용**
- `docs/WORK.md`에서 제거한 완료 항목을 그대로 옮기되, 날짜를 반드시 포함한다.

## CHANGELOG 및 릴리즈 버전 관리 규칙

이 프로젝트는 `CHANGELOG.md`를 통해 릴리즈 기준으로 주요 변경 사항을 기록한다.

CHANGELOG는 단순 작업 로그가 아니라, **릴리즈된 버전별 기능 변화 기록**이다.  
따라서 Claude는 기능을 구현할 때마다 버전을 임의로 올리지 않고, 개발 중 변경사항은 `[Unreleased]`에 누적한 뒤 릴리즈 시점에 버전을 확정한다.

---

### 1. 기본 원칙

- `CHANGELOG.md`는 릴리즈 기준으로 관리한다.
- 개발 중 변경사항은 항상 `[Unreleased]` 섹션에 먼저 기록한다.
- Claude는 작업 중 임의로 `1.2.0`, `1.2.1` 같은 새 버전을 만들지 않는다.
- 버전 번호는 사용자가 릴리즈를 요청했을 때만 확정한다.
- 실제 구현되지 않은 기능, 예정 기능, 아이디어는 CHANGELOG에 기록하지 않는다.
- 예정 기능은 PRD, TODO, Issue 등에 따로 관리한다.
- CHANGELOG에는 사용자 관점에서 의미 있는 변화와 프로젝트 구조상 중요한 변화만 기록한다.

---

### 2. CHANGELOG 업데이트 시점

다음 작업이 발생하면 `CHANGELOG.md`의 `[Unreleased]` 섹션을 확인하고 업데이트한다.

- 새로운 페이지 추가
- 새로운 기능 추가
- 기존 기능 변경
- 버그 수정
- UI/UX 변경
- 상태 관리 로직 변경
- 라우팅 구조 변경
- API 연동 방식 변경
- 인증/인가 관련 변경
- localStorage, sessionStorage, Redux 등 데이터 흐름 변경
- 설정 파일, 빌드 방식, 프로젝트 구조 변경
- PRD, README, CLAUDE.md 등 주요 문서 변경

단, 아래 변경은 CHANGELOG에 기록하지 않아도 된다.

- 단순 오타 수정
- 주석 수정
- 의미 없는 공백/포맷팅 변경
- 기능 변화 없는 파일 정리
- 실험 후 최종 코드에 남지 않은 변경

---

### 3. CHANGELOG 기본 구조

`CHANGELOG.md`는 아래 구조를 유지한다.

```md
# CHANGELOG

이 프로젝트의 주요 변경 사항을 버전별로 기록합니다.

## [Unreleased]

### Added

- 아직 릴리즈되지 않은 새 기능

### Changed

- 아직 릴리즈되지 않은 기존 기능 변경

### Fixed

- 아직 릴리즈되지 않은 버그 수정

### Removed

- 아직 릴리즈되지 않은 제거 사항

## [1.1.0] - 2026-05-14

### Added

- 로그인 페이지 (`/login`) — 이메일/비밀번호 입력, 유효성 검사, mock 인증

### Changed

- Header UI 변경 — 로그인 상태에 따라 로그인/로그아웃 버튼 표시
```

## 작업 조회 규칙

- **"다음 작업은?"** 또는 **"앞으로 할 작업은?"** 이라고 물으면
  → `docs/WORK.md`를 먼저 읽고 답한다.
- **"이전에 한 작업은?"** 또는 **"완료한 작업은?"** 이라고 물으면
  → `docs/HISTORY.md`를 참고하라고 안내한다.

## 문서 파일 역할

| 파일                      | 역할                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| `docs/PRD.md`             | 제품 요구사항 정의서 — 목표, 유저 스토리, 기능 명세, Out of Scope |
| `docs/DESIGN.md`          | 디자인 가이드 — 색상 토큰, 타이포그래피, 컴포넌트 스펙            |
| `docs/DESIGN_WORKFLOW.md` | Figma · Stitch 활용 워크플로우                                    |
| `docs/WORK.md`            | 현재 작업 현황 및 앞으로 할 일                                    |
| `docs/HISTORY.md`         | 작업 단위 완료 기록 — 개발 과정에서 완료된 작업을 시간순으로 기록 |
| `CHANGELOG.md`            | 릴리즈 변경 이력 — 배포 가능한 버전 기준으로 주요 변경 사항 기록  |

```

```

## 문서 업데이트 타이밍 규칙

Claude는 문서를 commit 시점에 한 번에 몰아서 작성하지 않는다.
각 문서는 아래 시점에 맞춰 즉시 업데이트한다.

- 작업 시작 전: `docs/WORK.md`의 `진행 예정`에 작업 추가
- 작업 중 기술 결정 발생 시: `docs/WORK.md`의 `결정 사항`에 기록
- 요구사항 변경 시: `docs/PRD.md` 업데이트
- 디자인 기준 변경 시: `docs/DESIGN.md` 업데이트
- 작업 완료 직후: `docs/WORK.md`에서 제거하고 `docs/HISTORY.md`에 완료 내역 추가
- 사용자 관점의 의미 있는 변경 발생 시: `CHANGELOG.md`의 `[Unreleased]`에 기록
- 릴리즈 요청 시에만: `[Unreleased]`를 실제 버전 섹션으로 이동

commit 직전에는 코드 변경사항과 문서 변경사항이 일치하는지 반드시 점검한다.
