import { createSlice } from '@reduxjs/toolkit'

const MOCK_USERS = [
  { email: 'test@fruit.com',  password: '1234',       name: '과일러버', isAdmin: false },
  { email: 'admin@fruit.com', password: 'admin1234',  name: '관리자',   isAdmin: true  },
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
        const user = { email: found.email, name: found.name, isAdmin: found.isAdmin }
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
        const user = { email, name, isAdmin: false }
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
    updateProfile(state, action) {
      const { name } = action.payload
      state.user = { ...state.user, name }
      saveUserToStorage(state.user)
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { login, signup, logout, updateProfile, clearError } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUser = (state) => state.auth.user
export const selectAuthError = (state) => state.auth.error
export const selectIsAdmin = (state) => state.auth.user?.isAdmin ?? false

export default authSlice.reducer
