import { test, expect } from '@playwright/test'

// 매 테스트마다 고유한 이메일로 중복 가입 충돌 방지
const uniqueEmail = () => `test_${Date.now()}@fruit.com`

test.describe('회원가입 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup')
  })

  // ── 유효성 검사 ──────────────────────────────────────────

  test('모든 필드가 빈 채로 제출하면 각 필드에 인라인 에러가 표시된다', async ({ page }) => {
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page.getByText('이름을 입력해주세요.')).toBeVisible()
    await expect(page.getByText('이메일을 입력해주세요.')).toBeVisible()
    await expect(page.getByText('비밀번호는 4자 이상이어야 합니다.')).toBeVisible()
    await expect(page.getByText('비밀번호 확인을 입력해주세요.')).toBeVisible()
  })

  test('이메일 형식이 올바르지 않으면 인라인 에러가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('이름을 입력하세요').fill('테스터')
    await page.getByPlaceholder('이메일을 입력하세요').fill('invalid-email')
    await page.getByPlaceholder('4자 이상 입력하세요').fill('1234')
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('1234')
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page.getByText('올바른 이메일 형식이 아닙니다.')).toBeVisible()
  })

  test('비밀번호가 4자 미만이면 인라인 에러가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('이름을 입력하세요').fill('테스터')
    await page.getByPlaceholder('이메일을 입력하세요').fill(uniqueEmail())
    await page.getByPlaceholder('4자 이상 입력하세요').fill('123')
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('123')
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page.getByText('비밀번호는 4자 이상이어야 합니다.')).toBeVisible()
  })

  test('비밀번호 확인이 일치하지 않으면 인라인 에러가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('4자 이상 입력하세요').fill('1234')
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('5678')
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page.getByText('비밀번호가 일치하지 않습니다.')).toBeVisible()
  })

  test('이미 가입된 이메일로 제출하면 상단 에러 배너가 표시된다', async ({ page }) => {
    await page.getByPlaceholder('이름을 입력하세요').fill('테스터')
    await page.getByPlaceholder('이메일을 입력하세요').fill('test@fruit.com')
    await page.getByPlaceholder('4자 이상 입력하세요').fill('1234')
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('1234')
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page.getByText('이미 가입된 이메일입니다.')).toBeVisible()
  })

  test('에러 배너가 표시된 후 입력 변경 시 배너가 사라진다', async ({ page }) => {
    await page.getByPlaceholder('이름을 입력하세요').fill('테스터')
    await page.getByPlaceholder('이메일을 입력하세요').fill('test@fruit.com')
    await page.getByPlaceholder('4자 이상 입력하세요').fill('1234')
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('1234')
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page.getByText('이미 가입된 이메일입니다.')).toBeVisible()

    await page.getByPlaceholder('이메일을 입력하세요').fill('other@fruit.com')
    await expect(page.getByText('이미 가입된 이메일입니다.')).not.toBeVisible()
  })

  // ── 가입 성공 ──────────────────────────────────────────

  test('가입 성공 시 홈으로 이동한다', async ({ page }) => {
    await page.getByPlaceholder('이름을 입력하세요').fill('새유저')
    await page.getByPlaceholder('이메일을 입력하세요').fill(uniqueEmail())
    await page.getByPlaceholder('4자 이상 입력하세요').fill('1234')
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('1234')
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page).toHaveURL('/')
  })

  test('가입 성공 시 자동 로그인되어 Header에 이름이 표시된다', async ({ page }) => {
    await page.getByPlaceholder('이름을 입력하세요').fill('새유저')
    await page.getByPlaceholder('이메일을 입력하세요').fill(uniqueEmail())
    await page.getByPlaceholder('4자 이상 입력하세요').fill('1234')
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('1234')
    await page.getByRole('button', { name: '가입하기' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByText('새유저님')).toBeVisible()
  })

  // ── 접근 제어 ──────────────────────────────────────────

  test('로그인 상태에서 /signup 접근 시 홈으로 리다이렉트된다', async ({ page }) => {
    // 로그인
    await page.goto('/login')
    await page.getByPlaceholder('이메일을 입력하세요').fill('test@fruit.com')
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('1234')
    await page.getByRole('button', { name: '로그인' }).click()
    await expect(page).toHaveURL('/')

    // 다시 /signup 접근
    await page.goto('/signup')
    await expect(page).toHaveURL('/')
  })

  // ── 페이지 링크 ──────────────────────────────────────────

  test('로그인 링크 클릭 시 /login으로 이동한다', async ({ page }) => {
    await page.getByRole('link', { name: '로그인' }).click()
    await expect(page).toHaveURL('/login')
  })

  test('홈으로 돌아가기 클릭 시 홈으로 이동한다', async ({ page }) => {
    await page.getByRole('link', { name: '← 홈으로 돌아가기' }).click()
    await expect(page).toHaveURL('/')
  })
})
