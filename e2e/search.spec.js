import { test, expect } from '@playwright/test'

test.describe('상품 검색', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // ── 기본 표시 ─────────────────────────────────────────────

  test('검색 입력창이 표시된다', async ({ page }) => {
    await expect(page.getByPlaceholder('상품명으로 검색')).toBeVisible()
  })

  // ── 한글 검색 ─────────────────────────────────────────────

  test('한글 상품명으로 검색하면 해당 상품만 표시된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('사과')
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).not.toBeVisible()
    await expect(page.getByText('딸기')).not.toBeVisible()
  })

  test('부분 검색어로 여러 상품이 필터링된다', async ({ page }) => {
    // "베" 가 포함된 상품 없음 → 빈 결과
    // "바" → 바나나 1개
    await page.getByPlaceholder('상품명으로 검색').fill('바')
    await expect(page.getByText('바나나')).toBeVisible()
    await expect(page.getByText('사과')).not.toBeVisible()
  })

  // ── 영문 검색 ─────────────────────────────────────────────

  test('영문 상품명으로 검색하면 해당 상품이 표시된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('Apple')
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).not.toBeVisible()
  })

  test('영문 소문자로 검색해도 결과가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('apple')
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).not.toBeVisible()
  })

  test('영문 대문자로 검색해도 결과가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('BANANA')
    await expect(page.getByText('바나나')).toBeVisible()
    await expect(page.getByText('사과')).not.toBeVisible()
  })

  // ── 빈 결과 ───────────────────────────────────────────────

  test('검색 결과가 없을 때 안내 문구가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('없는상품명xyz')
    await expect(page.getByText('검색 결과가 없습니다.')).toBeVisible()
  })

  // ── X 버튼 초기화 ─────────────────────────────────────────

  test('X 버튼 클릭 시 검색어가 초기화되고 전체 상품이 표시된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('사과')
    await expect(page.getByText('바나나')).not.toBeVisible()

    await page.getByRole('button', { name: '검색어 초기화' }).click()

    await expect(page.getByPlaceholder('상품명으로 검색')).toHaveValue('')
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).toBeVisible()
  })

  test('검색어가 없을 때 X 버튼이 표시되지 않는다', async ({ page }) => {
    await expect(page.getByRole('button', { name: '검색어 초기화' })).not.toBeVisible()
  })

  test('검색어 입력 후 X 버튼이 표시된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('사과')
    await expect(page.getByRole('button', { name: '검색어 초기화' })).toBeVisible()
  })

  // ── Enter 즉시 실행 ───────────────────────────────────────

  test('Enter 키를 누르면 즉시 필터링된다', async ({ page }) => {
    const input = page.getByPlaceholder('상품명으로 검색')
    await input.fill('사과')
    await input.press('Enter')
    // 디바운스(300ms) 대기 없이 즉시 결과가 반영되어야 한다
    await expect(page.getByText('바나나')).not.toBeVisible()
    await expect(page.getByText('사과')).toBeVisible()
  })

  // ── 카테고리 배지 ─────────────────────────────────────────

  test('전체 카테고리일 때 배지가 표시되지 않는다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /국내산 ✕|수입산 ✕/ })).not.toBeVisible()
  })

  test('카테고리 선택 시 배지가 표시된다', async ({ page }) => {
    await page.getByRole('button', { name: '국내산' }).click()
    await expect(page.getByLabel('국내산 필터 해제')).toBeVisible()
  })

  test('배지 클릭 시 카테고리가 전체로 초기화되고 배지가 사라진다', async ({ page }) => {
    await page.getByRole('button', { name: '국내산' }).click()
    await page.getByLabel('국내산 필터 해제').click()
    await expect(page.getByLabel('국내산 필터 해제')).not.toBeVisible()
    await expect(page.getByText('바나나')).toBeVisible() // 수입산 상품이 다시 표시
  })

  // ── 카테고리 + 검색어 복합 필터 ──────────────────────────

  test('카테고리 필터와 검색어가 AND 조건으로 적용된다', async ({ page }) => {
    // "국내산" 카테고리 + "사과" 검색 → 사과만 표시
    await page.getByRole('button', { name: '국내산' }).click()
    await page.getByPlaceholder('상품명으로 검색').fill('사과')
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).not.toBeVisible() // 수입산
    await expect(page.getByText('딸기')).not.toBeVisible()  // 국내산이지만 검색어 불일치
  })

  test('카테고리 변경 후에도 검색어가 유지된다', async ({ page }) => {
    await page.getByPlaceholder('상품명으로 검색').fill('Apple')
    await expect(page.getByText('사과')).toBeVisible()

    // 카테고리를 수입산으로 변경 → 사과는 국내산이므로 사라져야 한다
    await page.getByRole('button', { name: '수입산' }).click()
    await expect(page.getByText('사과')).not.toBeVisible()

    // 다시 전체로 변경 → 검색어("Apple")가 유지되어 사과만 표시
    await page.getByRole('button', { name: '전체' }).click()
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).not.toBeVisible()
  })

  test('검색어 초기화 후 카테고리 필터만 적용된 상태로 돌아간다', async ({ page }) => {
    await page.getByRole('button', { name: '국내산' }).click()
    await page.getByPlaceholder('상품명으로 검색').fill('사과')
    await expect(page.getByText('딸기')).not.toBeVisible()

    await page.getByRole('button', { name: '검색어 초기화' }).click()

    // 검색어는 사라지고 국내산 필터만 남아야 한다
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('딸기')).toBeVisible()   // 국내산
    await expect(page.getByText('바나나')).not.toBeVisible() // 수입산
  })
})
