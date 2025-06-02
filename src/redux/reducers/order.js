import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
  userId: "",
  totalPrice: 0,
  name: "",
  email: "",
};
export const orderSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    createNewOrderDetails: (state, action) => {
      state.orderId = action.payload.orderId;
      state.userId = action.payload.userId;
      state.totalPrice = action.payload.totalPrice;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    emptyOrder: (state) => {
      state.orderId = "";
      state.userId = "";
      state.totalPrice = 0;
      (state.name = ""), (state.email = "");
    },
  },
});

export const { emptyOrder, createNewOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
