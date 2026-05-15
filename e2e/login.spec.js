import { test, expect } from '@playwright/test'

const MOCK_EMAIL = 'test@fruit.com'
const MOCK_PASSWORD = '1234'

test.describe('로그인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  // ── 유효성 검사 ──────────────────────────────────────────

  test('이메일과 비밀번호 모두 빈 채로 제출하면 인라인 에러가 표시된다', async ({ page }) => {
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page.getByText('이메일을 입력해주세요.')).toBeVisible()
    await expect(page.getByText('비밀번호를 입력해주세요.')).toBeVisible()
  })

  test('이메일만 빈 채로 제출하면 이메일 에러만 표시된다', async ({ page }) => {
    await page.getByPlaceholder('비밀번호를 입력하세요').fill(MOCK_PASSWORD)
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page.getByText('이메일을 입력해주세요.')).toBeVisible()
    await expect(page.getByText('비밀번호를 입력해주세요.')).not.toBeVisible()
  })

  test('잘못된 계정 정보 입력 시 상단 에러 배너가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('이메일을 입력하세요').fill('wrong@email.com')
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('wrongpassword')
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeVisible()
  })

  test('에러 배너가 표시된 후 입력 변경 시 배너가 사라진다', async ({ page }) => {
    await page.getByPlaceholder('이메일을 입력하세요').fill('wrong@email.com')
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('wrongpassword')
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeVisible()

    await page.getByPlaceholder('이메일을 입력하세요').fill('other@email.com')
    await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).not.toBeVisible()
  })

  // ── 로그인 성공 ──────────────────────────────────────────

  test('로그인 성공 시 홈으로 이동한다', async ({ page }) => {
    await page.getByPlaceholder('이메일을 입력하세요').fill(MOCK_EMAIL)
    await page.getByPlaceholder('비밀번호를 입력하세요').fill(MOCK_PASSWORD)
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page).toHaveURL('/')
  })

  test('로그인 성공 시 Header에 사용자 이름이 표시된다', async ({ page }) => {
    await page.getByPlaceholder('이메일을 입력하세요').fill(MOCK_EMAIL)
    await page.getByPlaceholder('비밀번호를 입력하세요').fill(MOCK_PASSWORD)
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByText('과일러버님')).toBeVisible()
  })

  // ── 접근 제어 ──────────────────────────────────────────

  test('로그인 상태에서 /login 접근 시 홈으로 리다이렉트된다', async ({ page }) => {
    // 로그인
    await page.getByPlaceholder('이메일을 입력하세요').fill(MOCK_EMAIL)
    await page.getByPlaceholder('비밀번호를 입력하세요').fill(MOCK_PASSWORD)
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page).toHaveURL('/')

    // 다시 /login 접근
    await page.goto('/login')
    await expect(page).toHaveURL('/')
  })

  // ── 페이지 링크 ──────────────────────────────────────────

  test('회원가입 링크 클릭 시 /signup으로 이동한다', async ({ page }) => {
    await page.getByRole('link', { name: '회원가입' }).click()
    await expect(page).toHaveURL('/signup')
  })

  test('홈으로 돌아가기 클릭 시 홈으로 이동한다', async ({ page }) => {
    await page.getByRole('link', { name: '← 홈으로 돌아가기' }).click()
    await expect(page).toHaveURL('/')
  })
})
