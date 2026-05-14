# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 안내 문서입니다.

## 프로젝트 개요

신선한 과일을 온라인으로 구매할 수 있는 쇼핑몰 애플리케이션이다.
홈 화면의 슬라이더와 상품 목록에서 원하는 과일을 선택하고,
상세 페이지에서 장바구니 담기 또는 즉시 구매가 가능하다.

**주요 화면**
- **Home** — 배너 슬라이더 + 과일 상품 목록
- **상품 상세** — 과일 상세 정보, 장바구니 담기, 구매하기
- **장바구니** — 담긴 상품 목록 및 수량 관리
- **로그인** — 이메일 + 비밀번호 로그인 (mock)
- **회원가입** — 이름 + 이메일 + 비밀번호 가입 (mock)

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

| 타입 | 설명 |
|---|---|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `style` | UI/스타일 변경 |
| `refactor` | 기능 변화 없는 코드 개선 |
| `chore` | 설정, 패키지 등 기타 변경 |

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
