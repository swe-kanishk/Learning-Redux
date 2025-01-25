import { createStore } from "redux";
import { productsList } from "./productsList";

let initialState = {
  products: productsList,
  cartItems: [],
  wishlist: [],
};

const CART_ADD_ITEM = "cart/addItem";
const CART_REMOVE_ITEM = "cart/removeItem";
const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

const WISHLIST_ADD_ITEM = "wishlist/addItem";
const WISHLIST_REMOVE_ITEM = "wishlist/removeItem";

function reducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
    case CART_ITEM_INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case CART_ITEM_DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case WISHLIST_ADD_ITEM:
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
  }
  return state;
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
console.log(store);

store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 1, quantity: 1 } });
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 2, quantity: 2 } });
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 3, quantity: 1 } });

console.log(store.getState());

store.dispatch({
  type: CART_ITEM_INCREASE_QUANTITY,
  payload: { productId: 1 },
});
store.dispatch({
  type: CART_ITEM_DECREASE_QUANTITY,
  payload: { productId: 2 },
});
// store.dispatch({type: CART_ITEM_DECREASE_QUANTITY, payload: { productId: 2 }})

store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 1 } });
store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 2 } });
store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 3 } });

store.dispatch({ type: WISHLIST_REMOVE_ITEM, payload: { productId: 2 } });
console.log(store.getState());
