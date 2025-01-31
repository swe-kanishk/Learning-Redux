import { createSelector, createSlice } from "@reduxjs/toolkit";

const findExistingItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchCartItems(state) {
      state.loading = true;
    },
    fetchCartItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || "something went wrong!";
    },
    loadCartItems(state, action) {
      state.loading = false;
      state.list = action.payload.products;
    },
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

const {fetchCartItemsError, fetchCartItems, loadCartItems} = slice.actions

// thunk action creator
export const fetchCartItemsData = () => (dispatch) => {
  dispatch(fetchCartItems());
  fetch(`https://fakestoreapi.com/carts/5`)
    .then((res) => res.json())
    .then((data) => dispatch(loadCartItems(data)))
    .catch((error) => {
      dispatch(fetchCartItemsError(error.message));
    });
};

export const {
  cartAddItem,
  cartRemoveItem,
  increaseCartItemQty,
  decreaseCartItemQty,
} = slice.actions;

export default slice.reducer;