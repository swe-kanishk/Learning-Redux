import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistReducer";
import productsSlice from "./slices/productsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "./middleware/api";
import { func } from "./middleware/func";
import { logger } from "./middleware/logger";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cartItems: cartSlice,
    wishlist: wishlistSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger]
});