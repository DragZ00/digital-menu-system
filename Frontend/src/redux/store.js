import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import cartSlice from "./slices/cartSlice";


const store = configureStore({
  reducer: {
    customer: customerReducer,
    cart : cartSlice
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
