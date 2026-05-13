import { test, expect } from '@playwright/test'

test.describe('상품 상세 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/product/1') // 사과 상세 페이지
  })

  test('상품명이 표시된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '사과' })).toBeVisible()
  })

  test('영문명이 표시된다', async ({ page }) => {
    await expect(page.getByText('Apple')).toBeVisible()
  })

  test('가격이 표시된다', async ({ page }) => {
    await expect(page.getByText('3,000')).toBeVisible()
  })

  test('원산지 정보가 표시된다', async ({ page }) => {
    await expect(page.getByText('경북 안동')).toBeVisible()
  })

  test('장바구니 담기 버튼이 있다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /장바구니 담기/ })).toBeVisible()
  })

  test('바로 구매하기 버튼이 있다', async ({ page }) => {
    await expect(page.getByRole('button', { name: '바로 구매하기' })).toBeVisible()
  })

  test('존재하지 않는 상품 ID 접근 시 안내 문구가 표시된다', async ({ page }) => {
    await page.goto('/product/9999')
    await expect(page.getByText('상품을 찾을 수 없습니다.')).toBeVisible()
  })

  test('홈에서 상품 카드 클릭 시 상세 페이지로 이동한다', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /사과/ }).first().click()
    await expect(page).toHaveURL(/\/product\/1/)
    await expect(page.getByRole('heading', { name: '사과' })).toBeVisible()
  })

  test('뒤로가기 버튼 클릭 시 이전 페이지로 이동한다', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /사과/ }).first().click()
    await page.getByRole('button', { name: '뒤로가기' }).click()
    await expect(page).toHaveURL('/')
  })
})
