# Design System

피그마 원본: [Meta E-Commerce App Prototype](https://www.figma.com/design/S3CkpKmvMAlvYxtUUrjchP)
과일 쇼핑몰 전 페이지(홈, 상품 상세, 장바구니)에 일관되게 적용한다.

---

## Google Fonts

```html
<!-- index.html <head>에 추가 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Amethysta&family=Nunito:wght@400;500;600;700&family=Roboto:wght@400;500&family=Rubik:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

| 피그마 원본 | 적용 폰트 | 비고 |
|---|---|---|
| Amethysta | Amethysta | Google Fonts 동일 |
| Rubik | Rubik | Google Fonts 동일 |
| Gilroy | Nunito | Google Fonts 대체 |
| Roboto | Roboto | Google Fonts 동일 |

---

## Colors

| 용도 | Tailwind 커스텀 클래스 | HEX |
|---|---|---|
| Primary (CTA 버튼, 강조) | `bg-primary` / `text-primary` | `#DF4128` |
| 주 텍스트 | `text-main` | `#3A3A3A` |
| 보조 텍스트 | `text-sub` | `#616161` |
| 약한 텍스트 | `text-muted` | `#898989` |
| 비활성 / 취소선 | `text-disabled` | `#B0B0B0` |
| 구분선 | `border-line` | `#D8D8D8` |
| 입력 배경 | `bg-input` | `#F4F5F7` |
| 흰 배경 | `bg-white` (기본) | `#FFFFFF` |
| 할인 배지 | `bg-discount` | `#DD3E3E` |
| 신제품 배지 | `bg-new` | `#0698B8` |

---

## Typography

| 용도 | 폰트 | 크기 | 굵기 | 적용 위치 |
|---|---|---|---|---|
| 히어로 제목 | Amethysta | 47px | 400 | 홈 배너 메인 제목 |
| 히어로 부제 | Amethysta | 20px | 400 | 홈 배너 서브 텍스트 |
| 섹션 제목 | Roboto | 30px | 500 | 홈 각 섹션 제목 |
| 카드 상품명 | Rubik | 24px | 500 | 상품 카드, 상세 페이지 |
| 카드 부가 설명 | Roboto | 16px | 400 | 상품 카드 설명 |
| 기능 카드 제목 | Nunito | 18px | 600 | 특징 카드 (배송, 품질 등) |
| 기능 카드 설명 | Nunito | 16px | 500 | 특징 카드 설명 |
| 가격 (현재) | Rubik | 20px | 500 | 상품 카드, 상세, 장바구니 |
| 가격 (원가) | Rubik | 16px | 400 | 취소선 적용 |
| 본문 / 일반 | Roboto | 16px | 400 | 전반적인 본문 |
| 네비게이션 메뉴 | Nunito | 16px | 600 | 헤더 |
| 버튼 텍스트 | Nunito | 16px | 700 | 버튼 전체 |

---

## Spacing & Layout

| 항목 | 값 |
|---|---|
| 페이지 최대 너비 | 1440px |
| 페이지 좌우 패딩 | 40px (모바일: 16px) |
| 섹션 간 여백 (상하) | 80px |
| 섹션 내부 상하 패딩 | 40px |
| 상품 카드 간 간격 | 30px |
| 상품 카드 크기 | 285 x 446px |
| 헤더 높이 | 64px |

---

## Border Radius

| 컴포넌트 | 값 |
|---|---|
| 버튼 | 5px |
| 상품 카드 | 18px |
| 입력 필드 | 8px |
| 배지 (할인, New) | 9999px (원형) |
| 기능 카드 | 4px |

---

## Shadow

| 컴포넌트 | 값 |
|---|---|
| 버튼 (Primary) | `0px 4px 4px rgba(0, 0, 0, 0.15)` |
| 상품 카드 | `0px 4px 17px rgba(0, 0, 0, 0.07)` |
| 헤더 | `0px 2px 8px rgba(0, 0, 0, 0.08)` |

---

## Components

### Header
- 높이: 64px / 배경: White / 하단 그림자 적용
- 좌: 로고
- 중앙: 네비게이션 (홈, 상품, 장바구니)
- 우: 검색, 찜하기(하트), 장바구니 아이콘

### Button

| 종류 | 배경 | 텍스트 | 크기 | radius |
|---|---|---|---|---|
| Primary | `#DF4128` | White | 203x58px | 5px |
| Secondary (outline) | Transparent | `#DF4128` | - | 5px |

### Product Card
- 크기: 285 x 446px / radius: 18px
- 상단: 상품 이미지 (배경 `#F4F5F7`)
- 하단: 상품명(Rubik 24px), 설명(Roboto 16px), 가격
- 우상단: 배지 (할인 `#DD3E3E` / 신제품 `#0698B8`)
- 카드 그림자: `0px 4px 17px rgba(0, 0, 0, 0.07)`

### Badge

| 종류 | 배경 | 텍스트 | 예시 |
|---|---|---|---|
| 할인 | `#DD3E3E` | White | -30%, -50% |
| 신제품 | `#0698B8` | White | New |

### Feature Card (기능 소개)
- 크기: 280 x 85px / 배경: White / radius: 4px
- 아이콘 + 제목(Nunito 18px 600) + 설명(Nunito 16px 500)
- 4개 row 배치, 간격 92px

### Price Display
- 현재가: Rubik 20px 500, `#3A3A3A`
- 원가: Rubik 16px 400, `#B0B0B0`, `line-through`

---

## Page-specific Notes

### Home
- 히어로 배너: 전체 너비 이미지 + 좌측 텍스트 + EXPLORE 버튼
- 기능 카드 4개: 배송, 품질, 보증, 고객지원
- 추천 상품 3열 그리드
- 블로그/팁 카드 3개

### 상품 상세 (ProductDetail)
- 좌: 상품 이미지 (썸네일 포함)
- 우: 상품명, 가격, 설명, 수량 선택, 버튼 2개 (장바구니 담기 / 구매하기)
- 버튼: Primary (구매하기), Secondary outline (장바구니 담기)

### 장바구니 (Cart)
- 상품 목록 테이블 (이미지, 상품명, 가격, 수량, 합계, 삭제)
- 우측 주문 요약 카드 (소계, 합계, 결제하기 버튼)
- 빈 장바구니 상태 안내 문구 + 쇼핑 계속하기 버튼
