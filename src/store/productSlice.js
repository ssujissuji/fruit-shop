import { createSlice } from '@reduxjs/toolkit'
import initialProducts from '../data/products.json'

const STORAGE_KEY = 'products'

const loadProductsFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

const saveProductsToStorage = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const savedProducts = loadProductsFromStorage()

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: savedProducts ?? initialProducts,
  },
  reducers: {
    addProduct(state, action) {
      const maxId = state.items.reduce((max, p) => Math.max(max, p.id), 0)
      const newProduct = { ...action.payload, id: maxId + 1 }
      state.items.push(newProduct)
      saveProductsToStorage(state.items)
    },
  },
})

export const { addProduct } = productSlice.actions

export const selectProducts = (state) => state.products.items

export default productSlice.reducer
