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
export default function cartReducer(state=[], action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existingItem = state.find(cartItem => cartItem.productId === action.payload.productId)
      if(existingItem) {
        return state.map(cartItem => cartItem.productId === existingItem.productId ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
      }
      return [...state, {...action.payload, quantity: 1}];

    case CART_REMOVE_ITEM:
      return state.filter(
        (item) => item.productId !== action.payload.productId
      );

    case CART_ITEM_INCREASE_QUANTITY:
      return state.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
    case CART_ITEM_DECREASE_QUANTITY:
      return state
        .map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
  }
  return state;
}
