import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { login, clearError, selectAuthError, selectIsLoggedIn } from '../store/authSlice'
import { loginSchema } from '../schemas/authSchemas'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authError = useSelector(selectAuthError)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) })

  // register의 onChange를 래핑해서 서버 에러 초기화를 함께 처리
  const registerField = (name) => {
    const { onChange, ...rest } = register(name)
    return {
      ...rest,
      onChange: (e) => {
        onChange(e)
        if (authError) dispatch(clearError())
      },
    }
  }

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true })
  }, [isLoggedIn, navigate])

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const onSubmit = ({ email, password }) => {
    dispatch(login({ email, password }))
  }

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

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* 이메일 */}
              <div className="mb-4">
                <label className="block text-sm font-semibold font-ui text-text-main mb-1.5">
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  {...registerField('email')}
                  className={`w-full px-4 py-3 rounded-input bg-bg-input text-sm font-body text-text-main placeholder:text-text-disabled outline-none transition-all border ${
                    errors.email
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-transparent focus:border-primary'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-body">{errors.email.message}</p>
                )}
              </div>

              {/* 비밀번호 */}
              <div className="mb-6">
                <label className="block text-sm font-semibold font-ui text-text-main mb-1.5">
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  {...registerField('password')}
                  className={`w-full px-4 py-3 rounded-input bg-bg-input text-sm font-body text-text-main placeholder:text-text-disabled outline-none transition-all border ${
                    errors.password
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-transparent focus:border-primary'
                  }`}
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 font-body">{errors.password.message}</p>
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
