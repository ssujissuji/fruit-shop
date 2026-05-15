import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ product, quantity }]
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find((item) => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload
      state.items = state.items.filter((item) => item.product.id !== productId)
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload
      const item = state.items.find((item) => item.product.id === productId)

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== productId)
        } else {
          item.quantity = quantity
        }
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// 셀렉터
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)

export default cartSlice.reducer
