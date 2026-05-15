# Design Guide — 과일가게

**최초 작성**: 2026-05-14  
**대상 프로젝트**: fruit-shop (React + TailwindCSS v4)

---

## 1. 디자인 레퍼런스

| 용도 | 피그마 URL | 비고 |
|---|---|---|
| 전체 레이아웃·구조 참고 | [Meta E-Commerce App Prototype](https://www.figma.com/design/S3CkpKmvMAlvYxtUUrjchP) | 홈·상세·장바구니 전 페이지 적용 |

---

## 2. 색상 토큰

`src/index.css`의 `@theme`에 정의된 커스텀 토큰을 사용한다.

### 브랜드 색상

| 역할 | Tailwind 클래스 | Hex | 사용처 |
|---|---|---|---|
| Primary | `bg-primary` / `text-primary` | `#DF4128` | CTA 버튼, 로고, 배지 활성, 링크 hover |

### 카테고리 배지 색상

카테고리 배지는 토큰이 아닌 인라인 스타일로 적용한다 (동적 색상).

| 카테고리 | Hex | 사용처 |
|---|---|---|
| 전체 | `#DF4128` | 카테고리 필터 버튼, 배지 |
| 국내산 | `#059669` | 카테고리 필터 버튼, 배지 |
| 수입산 | `#7C5CBF` | 카테고리 필터 버튼, 배지 |

### 텍스트 색상

| 역할 | Tailwind 클래스 | Hex | 사용처 |
|---|---|---|---|
| Text Main | `text-text-main` | `#3A3A3A` | 상품명, 제목, 가격 |
| Text Sub | `text-text-sub` | `#616161` | 본문, 내비게이션 |
| Text Muted | `text-text-muted` | `#898989` | 보조 설명, 단위, 원산지 |
| Text Disabled | `text-text-disabled` | `#B0B0B0` | placeholder, 취소선 원가 |

### 배경 · 경계선

| 역할 | Tailwind 클래스 | Hex | 사용처 |
|---|---|---|---|
| Page BG | `bg-bg-page` | `#FFFFFF` | 페이지 기본 배경 |
| Input BG | `bg-bg-input` | `#F4F5F7` | 상품 이미지 영역, 입력 필드 배경 |
| Border | `border-border-line` | `#D8D8D8` | 구분선, 카드 구분 |

### 상태 색상

| 역할 | Tailwind 클래스 | Hex | 사용처 |
|---|---|---|---|
| Danger | `text-red-500` / `border-red-400` | `#ef4444` | 유효성 에러, 서버 에러 배경 |
| Discount Badge | `bg-bg-discount` | `#DD3E3E` | 할인 배지 |
| New Badge | `bg-bg-new` | `#0698B8` | 신제품 배지 |

---

## 3. 타이포그래피

Google Fonts를 사용한다. `src/index.css` 상단에 임포트되어 있다.

```css
@import url("https://fonts.googleapis.com/css2?family=Amethysta&family=Nunito:ital,wght@0,200..900;1,200..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");
```

| 피그마 원본 | 적용 폰트 | Tailwind 클래스 | 비고 |
|---|---|---|---|
| Amethysta | Amethysta | `font-hero` | 히어로 배너 제목 |
| Roboto | Roboto | `font-body` | 본문 기본값 (`body`에 적용) |
| Rubik | Rubik | `font-price` | 상품명, 가격 |
| Gilroy | Nunito | `font-ui` | 버튼, 내비, 배지 (Google Fonts 대체) |

### 크기 스케일

| 역할 | 폰트 | 크기 | 굵기 | 사용처 |
|---|---|---|---|---|
| 히어로 제목 | `font-hero` | `47px` | `400` | 홈 배너 메인 제목 |
| 히어로 부제 | `font-hero` | `20px` | `400` | 홈 배너 서브 텍스트 |
| 섹션 제목 | `font-body` | `30px` | `500` | 홈 추천상품 섹션 제목 |
| 상품명 (카드) | `font-price` (Rubik) | `text-base` (16px) | `500` | 상품 카드 |
| 상품명 (상세) | `font-price` (Rubik) | `24px` | `600` | 상세 페이지 제목 |
| 가격 (현재) | `font-price` (Rubik) | `text-lg` (18px) | `500` | 카드 가격 |
| 가격 (원가) | `font-price` (Rubik) | `text-sm` (14px) | `400` | 취소선 적용 |
| 버튼 텍스트 | `font-ui` (Nunito) | `text-sm` (14px) | `700` | 버튼 전체 |
| 내비게이션 | `font-ui` (Nunito) | `text-sm` (14px) | `600` | 헤더 |
| 배지 | `font-ui` (Nunito) | `text-[10px]` | `700` | 카테고리 배지 |
| 본문 / 일반 | `font-body` (Roboto) | `text-sm` (14px) | `400` | 전반적인 본문 |

---

## 4. 간격 & 레이아웃

### 페이지 컨테이너

| 항목 | 값 | 클래스 |
|---|---|---|
| 최대 너비 | 72rem | `max-w-6xl mx-auto px-10` |
| 수평 패딩 | 40px | `px-10` |
| 섹션 수직 여백 | 80px | `mb-20` |
| 페이지 수직 패딩 | 40px | `py-10` |

### 헤더

| 항목 | 값 | 클래스 |
|---|---|---|
| 높이 | 64px | `h-16` |
| 위치 | sticky | `sticky top-0 z-50` |
| 배경·그림자 | White + shadow | `bg-white` + `shadow-header` (inline) |

### 그리드 (상품 목록)

| 브레이크포인트 | 컬럼 수 | 클래스 |
|---|---|---|
| 기본 (모바일) | 2열 | `grid-cols-2` |
| `sm` (640px~) | 3열 | `sm:grid-cols-3` |
| `lg` (1024px~) | 4열 | `lg:grid-cols-4` |

---

## 5. 공통 컴포넌트 스펙

### Border Radius 토큰

| 컴포넌트 | 토큰 | 값 |
|---|---|---|
| 버튼 | `rounded-btn` | `5px` |
| 상품 카드 | `rounded-card` | `18px` |
| 입력 필드 | `rounded-input` | `8px` |
| 배지 | `rounded-full` | `9999px` |

### Box Shadow 토큰

| 컴포넌트 | CSS 변수 | 값 |
|---|---|---|
| 버튼 (Primary) | `--shadow-btn` | `0px 4px 4px rgba(0, 0, 0, 0.15)` |
| 상품 카드 | `--shadow-card` | `0px 4px 17px rgba(0, 0, 0, 0.07)` |
| 헤더 | `--shadow-header` | `0px 2px 8px rgba(0, 0, 0, 0.08)` |

> 섀도는 Tailwind 유틸리티로 표현이 어려워 `style={{ boxShadow: '...' }}` 인라인으로 적용한다.

### 상품 카드

```
bg-white rounded-card overflow-hidden
transition-all duration-300 hover:-translate-y-1
boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)'

이미지 영역: bg-bg-input h-44 flex items-center justify-center
카드 정보: p-4
```

### 버튼 — Primary (채움)

```
bg-primary text-white font-bold font-ui
rounded-btn transition-all hover:opacity-90 active:scale-95
boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)'
```

### 버튼 — Secondary (테두리)

```
border text-primary border-primary
bg-white font-semibold font-ui
rounded-btn transition-all hover:opacity-80
```

### 카테고리 필터 버튼

```
px-4 py-1.5 rounded-full text-sm font-semibold font-ui transition-all border

활성: backgroundColor=카테고리색, color='#fff', borderColor=카테고리색
비활성: backgroundColor='#fff', color=카테고리색, borderColor=카테고리색
```

### 배지 (카테고리)

```
absolute top-3 left-3
text-white text-[10px] font-bold font-ui
px-2 py-0.5 rounded-full
backgroundColor: 카테고리별 색상 (인라인 스타일)
```

### 입력 필드

```
w-full px-4 py-3 rounded-input bg-bg-input
text-sm font-body text-text-main placeholder:text-text-disabled
outline-none transition-all border

정상: border-transparent focus:border-primary
에러: border-red-400 focus:border-red-400
```

### 특징 카드 (Feature Card)

```
flex items-center gap-3 bg-white rounded px-5 py-5
boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)'

제목: text-sm font-semibold font-ui text-text-main
설명: text-xs font-ui text-text-muted mt-0.5
```

---

## 6. 반응형 브레이크포인트

Tailwind 기본 브레이크포인트를 사용한다.

| 이름 | 너비 | 주요 레이아웃 변화 |
|---|---|---|
| (기본) | 0~639px | 2열 상품 그리드, 세로 스택 |
| `sm` | 640px~ | 3열 상품 그리드, 필터 가로 배치 |
| `md` | 768px~ | 상세 페이지 가로 분할 (이미지 + 정보) |
| `lg` | 1024px~ | 4열 상품 그리드, 장바구니 사이드바 분리 |

---

## 7. 피그마 → 코드 변환 노트

### 7-1. 전체 공통

| 피그마 원본 | 적용값 | 이유 |
|---|---|---|
| 상품 카드 크기 285×446px | 그리드 너비에 맞게 유동 | 반응형 그리드 대응 |
| 섀도 수치 | 인라인 `style={{ boxShadow }}` | Tailwind로 표현 불가한 정밀값 |
| Gilroy 폰트 | Nunito (`font-ui`) | Google Fonts 미제공, 대체 |

### 7-2. 카테고리 배지

피그마 원본의 할인(`#DD3E3E`) / 신제품(`#0698B8`) 배지 구조를 변형하여,  
과일 쇼핑몰 맥락에 맞게 **전체·국내산·수입산** 카테고리 배지로 대체했다.

| 원본 배지 | 대체 배지 | 색상 |
|---|---|---|
| 할인 배지 | 전체 / Primary | `#DF4128` |
| 신제품 배지 | 국내산 | `#059669` |
| (없음) | 수입산 | `#7C5CBF` |

배지 색상은 컴포넌트 내 `CATEGORY_COLOR` 상수로 관리하며 인라인 스타일로 적용한다.
