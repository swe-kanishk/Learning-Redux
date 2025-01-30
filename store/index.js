import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistReducer";
import productsSlice from "./slices/productsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middlewares/logger";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cartItems: cartSlice,
    wishlist: wishlistSlice,
  },
  middleware: () => [logger]
});