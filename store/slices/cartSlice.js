import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

const findExistingItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

  export const fetchCartItemsData = createAsyncThunk('cart/fetchCartItems', async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/5`)
      return response.json()
    } catch (error) {
      throw error
    }
  })

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    cartAddItem(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1;
      } else state.list.push({ ...action.payload, quantity: 1 });
    },
    cartRemoveItem(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQty(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
      console.log(
        JSON.parse(JSON.stringify(state.list[existingItemIndex].quantity))
      );
    },
    decreaseCartItemQty(state, action) {
      const existingItemIndex = findExistingItemIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity === 0) {
        state.list.splice(existingItemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItemsData.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchCartItemsData.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload.products
    })
    .addCase(fetchCartItemsData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
});

const getCartItems = ({ products, cartItems }) => {
  return cartItems.list
    .map(({ productId, quantity }) => {
      const cartProduct = products.list.find(
        (product) => product.id === productId
      );
      return { ...cartProduct, quantity };
    })
    .filter(({ title }) => title);
};

export const getAllCartItems = createSelector(
  getCartItems,
  (cartItems) => cartItems
);
export const getCartLoadingState = (state) => state.cartItems.loading;
export const getCartError = (state) => state.cartItems.error;

export const {
  cartAddItem,
  cartRemoveItem,
  increaseCartItemQty,
  decreaseCartItemQty,
} = slice.actions;

export default slice.reducer;