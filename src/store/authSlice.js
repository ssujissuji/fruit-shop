import { createSlice } from '@reduxjs/toolkit'

const MOCK_USERS = [
  { email: 'test@fruit.com', password: '1234', name: '과일러버' },
]

const loadUserFromStorage = () => {
  try {
    const saved = localStorage.getItem('auth_user')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

const saveUserToStorage = (user) => {
  localStorage.setItem('auth_user', JSON.stringify(user))
}

const removeUserFromStorage = () => {
  localStorage.removeItem('auth_user')
}

const savedUser = loadUserFromStorage()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    isLoggedIn: savedUser !== null,
    error: null,
  },
  reducers: {
    login(state, action) {
      const { email, password } = action.payload
      const found = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      )
      if (found) {
        const user = { email: found.email, name: found.name }
        state.user = user
        state.isLoggedIn = true
        state.error = null
        saveUserToStorage(user)
      } else {
        state.error = '이메일 또는 비밀번호가 올바르지 않습니다.'
      }
    },
    signup(state, action) {
      const { name, email, password } = action.payload
      const exists = MOCK_USERS.find((u) => u.email === email)
      if (exists) {
        state.error = '이미 가입된 이메일입니다.'
      } else {
        MOCK_USERS.push({ name, email, password })
        const user = { email, name }
        state.user = user
        state.isLoggedIn = true
        state.error = null
        saveUserToStorage(user)
      }
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
      state.error = null
      removeUserFromStorage()
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { login, signup, logout, clearError } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUser = (state) => state.auth.user
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
