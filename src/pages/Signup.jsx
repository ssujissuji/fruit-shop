import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup, clearError, selectAuthError } from '../store/authSlice'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Signup() {
  const dispatch = useDispatch()
  const authError = useSelector(selectAuthError)

  const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirm: '' })
  const [touched, setTouched] = useState({ name: false, email: false, password: false, passwordConfirm: false })

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

  const getFieldError = (field) => {
    if (!touched[field]) return null
    if (field === 'name' && !form.name) return '이름을 입력해주세요.'
    if (field === 'email') {
      if (!form.email) return '이메일을 입력해주세요.'
      if (!EMAIL_REGEX.test(form.email)) return '올바른 이메일 형식이 아닙니다.'
    }
    if (field === 'password') {
      if (!form.password) return '비밀번호를 입력해주세요.'
      if (form.password.length < 4) return '비밀번호는 4자 이상이어야 합니다.'
    }
    if (field === 'passwordConfirm') {
      if (!form.passwordConfirm) return '비밀번호 확인을 입력해주세요.'
      if (form.password !== form.passwordConfirm) return '비밀번호가 일치하지 않습니다.'
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, passwordConfirm: true })

    const hasError =
      !form.name ||
      !form.email ||
      !EMAIL_REGEX.test(form.email) ||
      !form.password ||
      form.password.length < 4 ||
      form.password !== form.passwordConfirm

    if (hasError) return
    dispatch(signup({ name: form.name, email: form.email, password: form.password }))
  }

  const fields = [
    { name: 'name', label: '이름', type: 'text', placeholder: '이름을 입력하세요' },
    { name: 'email', label: '이메일', type: 'email', placeholder: '이메일을 입력하세요' },
    { name: 'password', label: '비밀번호', type: 'password', placeholder: '4자 이상 입력하세요' },
    { name: 'passwordConfirm', label: '비밀번호 확인', type: 'password', placeholder: '비밀번호를 다시 입력하세요' },
  ]

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

      {/* 회원가입 폼 */}
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
                회원가입
              </h1>
              <p className="text-sm text-text-muted font-body mt-1">과일가게의 새 멤버가 되어보세요</p>
            </div>

            {/* 서버 에러 */}
            {authError && (
              <div className="mb-5 px-4 py-3 rounded-input bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-body">{authError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {fields.map((field, idx) => {
                const error = getFieldError(field.name)
                const isLast = idx === fields.length - 1
                return (
                  <div key={field.name} className={isLast ? 'mb-6' : 'mb-4'}>
                    <label className="block text-sm font-semibold font-ui text-text-main mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 rounded-input bg-bg-input text-sm font-body text-text-main placeholder:text-text-disabled outline-none transition-all border ${
                        error
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-transparent focus:border-primary'
                      }`}
                    />
                    {error && (
                      <p className="mt-1.5 text-xs text-red-500 font-body">{error}</p>
                    )}
                  </div>
                )
              })}

              {/* 가입 버튼 */}
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white text-sm font-bold font-ui rounded-btn transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}
              >
                가입하기
              </button>
            </form>

            {/* 로그인 링크 */}
            <div className="mt-6 pt-6 border-t border-border-line">
              <p className="text-xs text-center text-text-muted font-body">
                이미 계정이 있으신가요?&nbsp;
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  로그인
                </Link>
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

export default Signup
