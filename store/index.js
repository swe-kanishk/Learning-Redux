import { combineReducers, createStore } from "redux";
import cartReducer, { cartAddItem, cartRemoveItem, decreaseCartItemQty, increaseCartItemQty } from "./cartReducer";
import wishlistReducer, { wishlistAddItem, wishlistRemoveItem } from "./wishlistReducer";
import productsReducer from "./productsReducer";

const reducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishlist: wishlistReducer,
})

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
// console.log(store);

// cart
// store.dispatch(cartAddItem(1));
// store.dispatch(cartAddItem(2));
// store.dispatch(cartAddItem(3));

// store.dispatch(increaseCartItemQty(1));
// store.dispatch(increaseCartItemQty(2));
// store.dispatch(increaseCartItemQty(3));
// store.dispatch(decreaseCartItemQty(2));
// store.dispatch(cartRemoveItem(2));

// // wishlist
// store.dispatch(wishlistAddItem(2));
// store.dispatch(wishlistAddItem(3));
// store.dispatch(wishlistRemoveItem(3));