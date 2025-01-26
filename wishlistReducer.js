export const WISHLIST_ADD_ITEM = "wishlist/addItem";
export const WISHLIST_REMOVE_ITEM = "wishlist/removeItem";

export default function wishlistReducer(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      return [...state, action.payload];
    case WISHLIST_REMOVE_ITEM:
      return state.filter(
        (item) => item.productId !== action.payload.productId
      );
  }
  return state;
}
