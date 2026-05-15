import { test, expect } from '@playwright/test'

const ADMIN_EMAIL = 'admin@fruit.com'
const ADMIN_PASSWORD = 'admin1234'

async function loginAsAdmin(page) {
  await page.goto('/login')
  await page.getByPlaceholder('이메일을 입력하세요').fill(ADMIN_EMAIL)
  await page.getByPlaceholder('비밀번호를 입력하세요').fill(ADMIN_PASSWORD)
  await page.getByRole('button', { name: '로그인' }).click()
  await page.waitForURL('/')
}

/** 폼 공통 입력 헬퍼 */
async function fillProductForm(page, { name, englishName, price, stock, origin, weight, emoji, category, description }) {
  await page.getByPlaceholder('예: 사과').fill(name)
  await page.getByPlaceholder('예: Apple').fill(englishName)
  await page.getByPlaceholder('예: 3000').fill(price)
  await page.getByPlaceholder('예: 50', { exact: true }).fill(stock)
  await page.getByPlaceholder('예: 경북 안동').fill(origin)
  await page.getByPlaceholder('예: 500').fill(weight)
  await page.locator('select[name="image"]').selectOption(emoji)
  await page.locator('select[name="category"]').selectOption(category)
  await page.getByPlaceholder('상품에 대한 상세 설명을 입력해주세요.').fill(description)
}

test.describe('관리자 상품 관리', () => {
  test.beforeEach(async ({ page }) => {
    // localStorage 초기화 (등록 상품 누적 방지)
    await page.goto('/')
    await page.evaluate(() => localStorage.removeItem('products'))
    await loginAsAdmin(page)
  })

  // ── 접근 제어 ──────────────────────────────────────────────

  test('비로그인 상태로 /admin/products 접근 시 /login으로 리다이렉트된다', async ({ page }) => {
    // 로그아웃 상태로 새 페이지 시작
    await page.evaluate(() => localStorage.removeItem('auth_user'))
    await page.goto('/admin/products')
    await expect(page).toHaveURL('/login')
  })

  test('일반 계정으로 /admin/products 접근 시 홈으로 리다이렉트된다', async ({ page }) => {
    await page.evaluate(() => {
      const user = JSON.parse(localStorage.getItem('auth_user') || '{}')
      localStorage.setItem('auth_user', JSON.stringify({ ...user, isAdmin: false }))
    })
    await page.goto('/admin/products')
    await expect(page).toHaveURL('/')
  })

  test('admin 로그인 시 Header에 "상품 관리" 메뉴가 표시된다', async ({ page }) => {
    await expect(page.getByRole('link', { name: '🛠 상품 관리' })).toBeVisible()
  })

  // ── 상품 관리 목록 ──────────────────────────────────────────

  test('상품 관리 목록에 기존 상품이 테이블로 표시된다', async ({ page }) => {
    await page.goto('/admin/products')
    const rows = page.locator('table tbody tr')
    await expect(rows).toHaveCount(10)
  })

  // ── 상품 등록 ──────────────────────────────────────────────

  test('상품 등록 폼에서 필수 항목 미입력 시 인라인 에러가 표시된다', async ({ page }) => {
    await page.goto('/admin/product/new')
    await page.getByRole('button', { name: '등록하기' }).click()
    await expect(page.getByText('상품명(한글)을 입력해주세요.')).toBeVisible()
    await expect(page.getByText('상품명(영문)을 입력해주세요.')).toBeVisible()
    await expect(page.getByText('가격을 입력해주세요.')).toBeVisible()
    await expect(page.getByText('이모지를 선택해주세요.')).toBeVisible()
    await expect(page.getByText('카테고리를 선택해주세요.')).toBeVisible()
  })

  test('상품 등록 완료 후 상품 관리 목록으로 이동하고 등록한 상품이 표시된다', async ({ page }) => {
    await page.goto('/admin/product/new')
    await fillProductForm(page, {
      name: '테스트귤',
      englishName: 'Test Tangerine',
      price: '3500',
      stock: '10',
      origin: '제주도',
      weight: '300',
      emoji: '🍊',
      category: '국내산',
      description: '테스트용 귤입니다.',
    })
    await page.getByRole('button', { name: '등록하기' }).click()

    await expect(page).toHaveURL('/admin/products')
    await expect(page.getByText('테스트귤')).toBeVisible()
  })

  test('홈 화면에서 등록한 상품 카드에 선택한 이모지가 표시된다', async ({ page }) => {
    // 🍇 포도 이모지로 상품 등록
    await page.goto('/admin/product/new')
    await fillProductForm(page, {
      name: '커스텀과일',
      englishName: 'Custom Fruit',
      price: '9999',
      stock: '5',
      origin: '테스트산지',
      weight: '100',
      emoji: '🍇',
      category: '수입산',
      description: '커스텀 과일 설명.',
    })
    await page.getByRole('button', { name: '등록하기' }).click()

    await page.goto('/')

    // 등록한 상품 카드에서 선택한 이모지(🍇)가 보여야 함
    const card = page.locator('a[href*="/product/"]', { has: page.getByText('커스텀과일') })
    await expect(card).toBeVisible()
    await expect(card.getByText('🍇')).toBeVisible()
  })

  // ── 상품 수정 ──────────────────────────────────────────────

  test('수정 버튼 클릭 시 해당 상품의 수정 폼으로 이동하고 기존 데이터가 pre-fill된다', async ({ page }) => {
    await page.goto('/admin/products')
    await page.locator('table tbody tr').first().getByRole('button', { name: '수정' }).click()
    await expect(page).toHaveURL(/\/admin\/product\/\d+\/edit/)
    await expect(page.getByPlaceholder('예: 사과')).toHaveValue('사과')
    await expect(page.getByPlaceholder('예: Apple')).toHaveValue('Apple')
  })

  test('수정 완료 후 /admin/products로 이동하고 변경 내용이 반영된다', async ({ page }) => {
    await page.goto('/admin/products')
    await page.locator('table tbody tr').first().getByRole('button', { name: '수정' }).click()
    await page.getByPlaceholder('예: 사과').fill('사과(수정됨)')
    await page.getByRole('button', { name: '수정 완료' }).click()
    await expect(page).toHaveURL('/admin/products')
    await expect(page.getByText('사과(수정됨)')).toBeVisible()
  })

  // ── 상품 삭제 ──────────────────────────────────────────────

  test('삭제 버튼 클릭 시 확인 다이얼로그가 표시되고 취소 시 삭제되지 않는다', async ({ page }) => {
    await page.goto('/admin/products')
    const rows = page.locator('table tbody tr')
    const countBefore = await rows.count()

    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm')
      await dialog.dismiss()
    })
    await rows.first().getByRole('button', { name: '삭제' }).click()
    await expect(rows).toHaveCount(countBefore)
  })

  test('삭제 확인 시 상품이 즉시 목록에서 제거된다', async ({ page }) => {
    await page.goto('/admin/products')
    const rows = page.locator('table tbody tr')
    const countBefore = await rows.count()
    const firstName = await rows.first().locator('td').nth(1).locator('p').first().textContent()

    page.on('dialog', (dialog) => dialog.accept())
    await rows.first().getByRole('button', { name: '삭제' }).click()

    await expect(rows).toHaveCount(countBefore - 1)
    await expect(page.getByText(firstName)).not.toBeVisible()
  })

  test('새로고침 후에도 삭제된 상품이 복원되지 않는다', async ({ page }) => {
    await page.goto('/admin/products')
    const firstName = await page
      .locator('table tbody tr').first()
      .locator('td').nth(1).locator('p').first()
      .textContent()

    page.on('dialog', (dialog) => dialog.accept())
    await page.locator('table tbody tr').first().getByRole('button', { name: '삭제' }).click()

    await page.reload()
    await expect(page.getByText(firstName)).not.toBeVisible()
  })

  test('수정 내용은 새로고침 후에도 유지된다', async ({ page }) => {
    await page.goto('/admin/products')
    await page.locator('table tbody tr').first().getByRole('button', { name: '수정' }).click()
    await page.getByPlaceholder('예: 사과').fill('사과(영속화확인)')
    await page.getByRole('button', { name: '수정 완료' }).click()

    await page.reload()
    await expect(page.getByText('사과(영속화확인)')).toBeVisible()
  })

  test('존재하지 않는 id의 수정 페이지 접근 시 /admin/products로 리다이렉트된다', async ({ page }) => {
    await page.goto('/admin/product/99999/edit')
    await expect(page).toHaveURL('/admin/products')
  })
})
