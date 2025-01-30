import { myCreateSlice } from "../../redux-toolkit";

const findExistingItemIndex = (state, action) => state.findIndex(cartItem => cartItem.productId === action.payload.productId)

const myslice = myCreateSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    cartAddItem(state, action) {
      const existingItemIndex = findExistingItemIndex(state, action)
      if(existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      }
      else state.push({...action.payload, quantity: 1})
    },
    cartRemoveItem(state, action) {
      const existingItemIndex = findExistingItemIndex(state, action)
      state.splice(existingItemIndex, 1)
    },
    increaseCartItemQty(state, action) {
      const existingItemIndex = findExistingItemIndex(state, action)
      state[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQty(state, action) {
      const existingItemIndex = findExistingItemIndex(state, action)
      state[existingItemIndex].quantity -= 1;
        if(state[existingItemIndex].quantity === 0) {
          state.splice(existingItemIndex, 1)
        }
    },
}})

export const {cartAddItem, cartRemoveItem, increaseCartItemQty, decreaseCartItemQty } = myslice.actions
export default myslice.reducer