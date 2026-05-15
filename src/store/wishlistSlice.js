import { createSlice } from '@reduxjs/toolkit'

const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveWishlistToStorage = (items) => {
  localStorage.setItem('wishlist', JSON.stringify(items))
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload
      const index = state.items.findIndex((item) => item.id === product.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      saveWishlistToStorage(state.items)
    },
    removeFromWishlist(state, action) {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
      saveWishlistToStorage(state.items)
    },
    clearWishlist(state) {
      state.items = []
      saveWishlistToStorage(state.items)
    },
  },
})

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions

export const selectWishlistItems = (state) => state.wishlist.items
export const selectIsWishlisted = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id)
export const selectWishlistCount = (state) => state.wishlist.items.length

export default wishlistSlice.reducer
