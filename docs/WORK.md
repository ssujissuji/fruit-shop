# WORK.md

현재 진행 중이거나 앞으로 할 작업만 관리합니다.  
완료된 작업은 `docs/HISTORY.md`로 이동합니다.

---

## 진행 중

- 미커밋 변경사항 정리 및 커밋
  - `CLAUDE.md` 수정
  - `docs/design.md` 수정
  - `docs/CHANGELOG.md` 삭제 → 루트 `CHANGELOG.md`로 이동
  - `src/components/ui/ProductCard.jsx` 수정
  - `src/pages/Home.jsx` 수정
  - `docs/HISTORY.md`, `docs/WORK.md` 신규 추가 (현재 작업)

---

## 진행 예정

없음

---

## 결정 사항

| 날짜 | 결정 | 이유 |
|---|---|---|
| 2026-05-13 | mock 인증으로 구현 (서버 없음) | v1 범위 내 연습용 구현, 실제 서버 연동은 v2 이후 |
| 2026-05-13 | Playwright E2E 테스트 작성 | 핵심 사용자 시나리오 검증 자동화 |
| 2026-05-14 | `authSlice` localStorage 영속화 | 새로고침 시 로그인 상태 유지 |
| 2026-05-14 | Gilroy 폰트 → Nunito 대체 | Google Fonts 미제공으로 가장 유사한 폰트로 대체 |
| 2026-05-14 | 카테고리 배지 색상 인라인 스타일 적용 | 동적 색상이라 Tailwind 유틸리티로 표현 불가 |
| 2026-05-14 | `CHANGELOG.md`를 `docs/` 밖 루트로 이동 | 릴리즈 이력 파일은 프로젝트 루트에 두는 것이 관례 |

---

## v2 이후 고려 사항 (현재 범위 외)

- 실제 결제 연동 (Toss Payments 등)
- 주문 내역 페이지
- 찜하기 기능
- 상품 검색
