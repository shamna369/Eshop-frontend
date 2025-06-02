import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import cartReducer from "./reducers/cart";
import orderReducer from "./reducers/order";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
export default store;
