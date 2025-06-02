import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addProductTocartItems: (state, action) => {
      const IsExist = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!IsExist) state.cartItems.push({ ...action.payload, quantity: 1 });
      else IsExist.quantity++;
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) item.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) item.quantity--;
    },
    removeItemFromcartItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    emptyCartItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addProductTocartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromcartItems,
  emptyCartItems,
} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
