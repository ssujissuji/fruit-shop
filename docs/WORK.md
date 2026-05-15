# WORK.md

현재 진행 중이거나 앞으로 할 작업만 관리합니다.  
완료된 작업은 `docs/HISTORY.md`로 이동합니다.

---

## 진행 중

없음

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
| 2026-05-15 | react-hook-form + Zod 도입 | 수동 폼 상태 관리 대비 유효성 로직 선언적 관리, 코드량 감소 |
| 2026-05-15 | Zod 스키마를 `src/schemas/`로 분리 | 페이지와 관심사 분리, 향후 스키마 재사용 대비 |
| 2026-05-15 | `watch()` 대신 `registerField()` 헬퍼 사용 | React Compiler의 `watch()` 메모이제이션 경고 해소 |
| 2026-05-15 | admin 인증에 `isAdmin` 플래그 방식 채택 | 이메일 하드코딩 없이 역할 기반으로 명확히 구분, 향후 확장 용이 |
| 2026-05-15 | 상품 이미지를 이모지 드롭다운으로 대체 | 서버 없는 환경에서 파일 저장 불가, 이모지로 단순하고 직관적으로 처리 |
| 2026-05-15 | 등록 상품을 `productSlice` + localStorage로 관리 | 새로고침 후에도 등록 상품 유지, 기존 wishlist 영속화 패턴 동일 적용 |
| 2026-05-15 | 중량 입력을 숫자 + 단위 드롭다운(g/kg)으로 분리 | 자유 텍스트 입력보다 입력 오류 방지, `inputClass`에 width 파라미터 추가로 flex 레이아웃 충돌 해소 |
| 2026-05-15 | 숫자 필드 유효성에 `z.coerce.number()` 채택 | Zod v4에서 `z.number({ invalid_type_error })` + `z.preprocess` 조합이 커스텀 메시지를 적용하지 않는 문제 확인, `z.coerce.number().min()` 방식으로 통일 |
| 2026-05-15 | `ProductCard` 이미지 렌더링을 URL/이모지로 분기 | admin 등록 상품의 `image` 필드가 이모지 문자열이므로 `img` 태그 사용 시 로드 실패 후 잘못된 fallback 표시 — `startsWith('/')` 또는 `http` 여부로 분기 |
| 2026-05-15 | `filterQuery` 상태 + `useEffect` 동기화 패턴 제거, `debouncedInput` 직접 사용 | state를 state로 동기화하는 `useEffect`는 불필요한 이중 렌더를 유발하는 anti-pattern (React 공식 문서 권장 제거) — Enter 즉시 실행 기능도 함께 제거, 300ms 디바운스로 충분 |

---

## v2 이후 고려 사항 (현재 범위 외)

- 실제 결제 연동 (Toss Payments 등)
- 주문 내역 페이지
