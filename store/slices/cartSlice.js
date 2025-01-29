import { produce } from "immer";

// Action Types
const CART_ADD_ITEM = "cart/addItem";
const CART_REMOVE_ITEM = "cart/removeItem";
const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

// Action Creators
export function decreaseCartItemQty(productId) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: { productId },
  };
}

export function increaseCartItemQty(productId) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: { productId },
  };
}

export function cartAddItem(productData) {
    return {
        type: CART_ADD_ITEM,
        payload: productData,
    };
}

export function cartRemoveItem(productId) {
    return {
        type: CART_REMOVE_ITEM,
        payload: { productId },
    };
}

// Reducer
export default function cartReducer(originalState=[], action) {
  return produce(originalState, (state) => {
    const existingItemIndex = state.findIndex(cartItem => cartItem.productId === action.payload.productId)

    switch (action.type) {
      case CART_ADD_ITEM:
        if(existingItemIndex !== -1) {
          state[existingItemIndex].quantity += 1;
          break
        }
        state.push({...action.payload, quantity: 1})
        break
  
      case CART_REMOVE_ITEM:
        state.splice(existingItemIndex, 1)
        break;
  
      case CART_ITEM_INCREASE_QUANTITY:
        state[existingItemIndex].quantity += 1;
        break
        
      case CART_ITEM_DECREASE_QUANTITY:
        state[existingItemIndex].quantity -= 1;
        if(state[existingItemIndex].quantity === 0) {
          state.splice(existingItemIndex, 1)
        }
    }
    return state;
  })
}
