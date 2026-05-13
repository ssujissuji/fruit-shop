import { test, expect } from '@playwright/test'

// href 기반 선택으로 뱃지 숫자에 영향받지 않음
const goToCart = async (page) => {
  await page.locator('a[href="/cart"]').click()
  await page.waitForURL('/cart')
}

// SPA 내에서 홈으로 이동
const goHome = async (page) => {
  await page.locator('a[href="/"]').first().click()
  await page.waitForURL('/')
}

// 카트의 상품명은 h3 이므로 strict mode 위반 없이 매칭
const cartItem = (page, name) => page.locator('h3').filter({ hasText: name })

test.describe('장바구니', () => {
  test('빈 장바구니 접근 시 안내 문구가 표시된다', async ({ page }) => {
    await page.goto('/cart')
    await expect(page.getByText('장바구니가 비어 있어요')).toBeVisible()
    await expect(page.getByRole('button', { name: '쇼핑하러 가기' })).toBeVisible()
  })

  test('빈 장바구니에서 쇼핑하러 가기 클릭 시 홈으로 이동한다', async ({ page }) => {
    await page.goto('/cart')
    await page.getByRole('button', { name: '쇼핑하러 가기' }).click()
    await expect(page).toHaveURL('/')
  })

  test('상세 페이지에서 장바구니 담기 후 장바구니로 이동하면 상품이 보인다', async ({ page }) => {
    await page.goto('/product/1') // 사과

    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    await goToCart(page)
    await expect(cartItem(page, '사과')).toBeVisible()
  })

  test('바로 구매하기 클릭 시 장바구니 페이지로 이동하고 상품이 담겨 있다', async ({ page }) => {
    await page.goto('/product/2') // 바나나
    await page.getByRole('button', { name: '바로 구매하기' }).click()
    await expect(page).toHaveURL('/cart')
    await expect(cartItem(page, '바나나')).toBeVisible()
  })

  test('수량 + 버튼 클릭 시 수량이 증가한다', async ({ page }) => {
    await page.goto('/product/1') // 사과
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    await goToCart(page)

    const quantityText = page.locator('span.w-5.text-center.font-bold.text-sm').first()
    await expect(quantityText).toHaveText('1')

    await page.getByRole('button', { name: '+' }).click()
    await expect(quantityText).toHaveText('2')
  })

  test('수량 - 버튼 클릭 시 수량 1이면 장바구니에서 제거된다', async ({ page }) => {
    await page.goto('/product/1')
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    await goToCart(page)
    await expect(cartItem(page, '사과')).toBeVisible()

    await page.getByRole('button', { name: '−' }).click()
    await expect(page.getByText('장바구니가 비어 있어요')).toBeVisible()
  })

  test('삭제 버튼 클릭 시 상품이 제거된다', async ({ page }) => {
    await page.goto('/product/1')
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    await goToCart(page)
    await expect(cartItem(page, '사과')).toBeVisible()

    // '전체 삭제'도 매칭되므로 exact: true 사용
    await page.getByRole('button', { name: '삭제', exact: true }).click()
    await expect(page.getByText('장바구니가 비어 있어요')).toBeVisible()
  })

  test('전체 삭제 버튼 클릭 시 장바구니가 비워진다', async ({ page }) => {
    // 사과 담기
    await page.goto('/product/1')
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    // SPA 내에서 바나나 상세로 이동 (Redux 상태 유지)
    await goHome(page)
    await page.getByRole('link', { name: /바나나/ }).first().click()
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    await goToCart(page)
    await expect(cartItem(page, '사과')).toBeVisible()
    await expect(cartItem(page, '바나나')).toBeVisible()

    await page.getByRole('button', { name: '전체 삭제' }).click()
    await expect(page.getByText('장바구니가 비어 있어요')).toBeVisible()
  })

  test('결제하기 버튼이 표시된다', async ({ page }) => {
    await page.goto('/product/1')
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    await goToCart(page)
    await expect(page.getByRole('button', { name: '결제하기' })).toBeVisible()
  })

  test('총 결제금액이 올바르게 표시된다', async ({ page }) => {
    await page.goto('/product/1') // 사과 3,000원
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /장바구니 담기/ }).click()

    await goToCart(page)
    // 주문 요약 섹션의 총 결제금액 확인
    await expect(page.getByText('3,000원').last()).toBeVisible()
  })
})
