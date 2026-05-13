import { test, expect } from '@playwright/test'

test.describe('홈 화면', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('슬라이더가 표시된다', async ({ page }) => {
    const slider = page.locator('section').first()
    await expect(slider).toBeVisible()
  })

  test('특징 배너 4개가 표시된다', async ({ page }) => {
    // 슬라이더에도 유사 텍스트가 있으므로 exact: true 로 배너 섹션의 텍스트만 매칭
    await expect(page.getByText('산지 직송', { exact: true })).toBeVisible()
    await expect(page.getByText('무료 배송', { exact: true })).toBeVisible()
    await expect(page.getByText('품질 보증', { exact: true })).toBeVisible()
    await expect(page.getByText('친환경', { exact: true })).toBeVisible()
  })

  test('상품 목록 타이틀이 표시된다', async ({ page }) => {
    await expect(page.getByText('전체 상품')).toBeVisible()
  })

  test('상품 카드가 렌더링된다', async ({ page }) => {
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).toBeVisible()
    await expect(page.getByText('딸기')).toBeVisible()
    await expect(page.getByText('포도')).toBeVisible()
    await expect(page.getByText('오렌지')).toBeVisible()
  })

  test('카테고리 필터 — 국내산 클릭 시 수입산 상품이 사라진다', async ({ page }) => {
    await page.getByRole('button', { name: '국내산' }).click()
    // 수입산 상품인 바나나가 안 보여야 한다
    await expect(page.getByText('바나나')).not.toBeVisible()
    // 국내산 상품인 사과는 보여야 한다
    await expect(page.getByText('사과')).toBeVisible()
  })

  test('카테고리 필터 — 수입산 클릭 시 국내산 상품이 사라진다', async ({ page }) => {
    await page.getByRole('button', { name: '수입산' }).click()
    await expect(page.getByText('사과')).not.toBeVisible()
    await expect(page.getByText('바나나')).toBeVisible()
  })

  test('카테고리 필터 — 전체 클릭 시 모든 상품이 표시된다', async ({ page }) => {
    await page.getByRole('button', { name: '국내산' }).click()
    await page.getByRole('button', { name: '전체' }).click()
    await expect(page.getByText('사과')).toBeVisible()
    await expect(page.getByText('바나나')).toBeVisible()
  })
})
