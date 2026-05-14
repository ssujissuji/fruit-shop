import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError, selectAuthError } from '../store/authSlice'

function Login() {
  const dispatch = useDispatch()
  const authError = useSelector(selectAuthError)

  const [form, setForm] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (authError) dispatch(clearError())
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!form.email || !form.password) return
    dispatch(login({ email: form.email, password: form.password }))
  }

  const emailError = touched.email && !form.email ? '이메일을 입력해주세요.' : null
  const passwordError = touched.password && !form.password ? '비밀번호를 입력해주세요.' : null

  return (
    <div className="min-h-screen bg-bg-page flex flex-col">
      {/* 상단 로고 바 */}
      <div className="border-b border-border-line" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="max-w-6xl mx-auto px-10 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-lg">🍊</span>
            </div>
            <div className="leading-tight">
              <span className="block text-base font-bold text-text-main font-ui">과일가게</span>
              <span className="block text-[10px] text-text-muted font-medium tracking-wide font-ui">FRESH FRUIT SHOP</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 로그인 폼 */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* 카드 */}
          <div
            className="bg-white rounded-card px-10 py-10"
            style={{ boxShadow: '0px 4px 17px rgba(0,0,0,0.07)' }}
          >
            {/* 헤더 */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🍊</span>
              </div>
              <h1
                className="text-text-main"
                style={{ fontFamily: 'Rubik, sans-serif', fontSize: '24px', fontWeight: 600 }}
              >
                로그인
              </h1>
              <p className="text-sm text-text-muted font-body mt-1">신선한 과일이 기다리고 있어요</p>
            </div>

            {/* 서버 에러 */}
            {authError && (
              <div className="mb-5 px-4 py-3 rounded-input bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-body">{authError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* 이메일 */}
              <div className="mb-4">
                <label className="block text-sm font-semibold font-ui text-text-main mb-1.5">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="이메일을 입력하세요"
                  className={`w-full px-4 py-3 rounded-input bg-bg-input text-sm font-body text-text-main placeholder:text-text-disabled outline-none transition-all border ${
                    emailError
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-transparent focus:border-primary'
                  }`}
                />
                {emailError && (
                  <p className="mt-1.5 text-xs text-red-500 font-body">{emailError}</p>
                )}
              </div>

              {/* 비밀번호 */}
              <div className="mb-6">
                <label className="block text-sm font-semibold font-ui text-text-main mb-1.5">
                  비밀번호
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="비밀번호를 입력하세요"
                  className={`w-full px-4 py-3 rounded-input bg-bg-input text-sm font-body text-text-main placeholder:text-text-disabled outline-none transition-all border ${
                    passwordError
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-transparent focus:border-primary'
                  }`}
                />
                {passwordError && (
                  <p className="mt-1.5 text-xs text-red-500 font-body">{passwordError}</p>
                )}
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white text-sm font-bold font-ui rounded-btn transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}
              >
                로그인
              </button>
            </form>

            {/* 회원가입 링크 */}
            <div className="mt-6 pt-6 border-t border-border-line">
              <p className="text-xs text-center text-text-muted font-body mb-3">
                아직 계정이 없으신가요?&nbsp;
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  회원가입
                </Link>
              </p>
              {/* 힌트 */}
              <p className="text-xs text-center text-text-muted font-body">
                연습용 계정&nbsp;&nbsp;|&nbsp;&nbsp;
                <span className="text-text-sub font-semibold">test@fruit.com</span>
                &nbsp;/&nbsp;
                <span className="text-text-sub font-semibold">1234</span>
              </p>
            </div>
          </div>

          {/* 홈으로 */}
          <p className="text-center mt-6 text-sm text-text-muted font-body">
            <Link to="/" className="text-primary font-semibold hover:underline">
              ← 홈으로 돌아가기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
