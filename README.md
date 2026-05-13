# 🍎 Fruit Shop

신선한 과일을 온라인으로 구매할 수 있는 쇼핑몰 애플리케이션입니다.  
홈 화면의 슬라이더와 상품 목록에서 원하는 과일을 선택하고, 상세 페이지에서 장바구니 담기 또는 즉시 구매가 가능합니다.

---

## 주요 화면

| 화면 | 설명 |
|---|---|
| **Home** | 배너 슬라이더 + 과일 상품 목록 |
| **상품 상세** | 과일 상세 정보, 장바구니 담기, 구매하기 |
| **장바구니** | 담긴 상품 목록 및 수량 관리 |

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 빌드 도구 | Vite |
| 프레임워크 | React 19 |
| 언어 | JavaScript (ES2022+) |
| 스타일링 | Tailwind CSS v4 |
| 라우팅 | React Router v7 (createBrowserRouter) |
| 상태 관리 | Redux Toolkit |
| 테스트 | Playwright (E2E) |
| 패키지 매니저 | npm |

---

## 프로젝트 구조

```
fruit-shop/
├── public/
│   └── images/               # 상품 이미지 파일
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer 레이아웃 컴포넌트
│   │   └── ui/               # Slider, ProductCard 등 UI 컴포넌트
│   ├── pages/
│   │   ├── Home.jsx          # 슬라이더 + 과일 상품 목록
│   │   ├── ProductDetail.jsx # 상품 상세 + 장바구니/구매 버튼
│   │   └── Cart.jsx          # 장바구니 페이지
│   ├── store/
│   │   ├── index.js          # Redux store 설정
│   │   └── cartSlice.js      # 장바구니 slice
│   ├── data/
│   │   └── products.json     # 과일 상품 기초 데이터
│   └── router/
│       └── index.jsx         # createBrowserRouter 라우터 설정
├── e2e/                      # Playwright E2E 테스트
│   ├── home.spec.js
│   ├── product-detail.spec.js
│   └── cart.spec.js
└── package.json
```

---

## 시작하기

### 요구사항

- Node.js 18 이상
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### 테스트

```bash
# E2E 테스트 실행
npm run test:e2e

# E2E 테스트 UI 모드로 실행
npm run test:e2e:ui
```

---

## 브랜치 전략

GitHub Flow 기반으로 운영합니다.

```
main          # 배포 가능한 안정 브랜치 (직접 커밋 금지)
└── develop   # 개발 통합 브랜치
    ├── feat/슬라이더-컴포넌트
    ├── feat/상품-상세-페이지
    ├── feat/장바구니-기능
    └── fix/이미지-경로-오류
```

- `main` — 최종 배포 브랜치. PR + 리뷰 후에만 병합합니다.
- `develop` — 기능 개발의 통합 기준 브랜치입니다.
- `feat/<기능명>` — 새 기능 개발 시 develop에서 분기합니다.
- `fix/<버그명>` — 버그 수정 시 develop에서 분기합니다.
