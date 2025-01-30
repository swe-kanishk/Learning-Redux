import { createSlice } from "@reduxjs/toolkit";

const findExistingItemIndex = (state, action) => state.findIndex(cartItem => cartItem.productId === action.payload.productId)

const slice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    list: [],
    error: ''
  },
  reducers: {
    fetchCartItems(state) {
      state.loading = true
    },
    fetchCartItemsError(state, action){
      state.loading = false
      state.error = action.payload || 'something went wrong!'
    },
    loadCartItems(state, action) {
      state.loading = false
      state.list = action.payload.products
    },
    cartAddItem(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action)
      if(existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1;
      }
      else state.list.push({...action.payload, quantity: 1})
    },
    cartRemoveItem(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action)
      state.list.splice(existingItemIndex, 1)
    },
    increaseCartItemQty(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action)
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQty(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action)
      state.list[existingItemIndex].quantity -= 1;
        if(state.list[existingItemIndex].quantity === 0) {
          state.list.splice(existingItemIndex, 1)
        }
    },
}})

export const {cartAddItem, fetchCartItemsError, fetchCartItems, loadCartItems, cartRemoveItem, increaseCartItemQty, decreaseCartItemQty } = slice.actions
export default slice.reducer