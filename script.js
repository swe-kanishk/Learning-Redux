import { createStore } from "redux";
import cartReducer, { CART_ADD_ITEM, CART_ITEM_DECREASE_QUANTITY, CART_ITEM_INCREASE_QUANTITY } from "./cartReducer";
import wishlistReducer, { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from "./wishlistReducer";
import productsReducer from "./productsReducer";

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function(state={}, action) {
    const nextState = {};

    for(let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  }
}

const reducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishlist: wishlistReducer,
})

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
