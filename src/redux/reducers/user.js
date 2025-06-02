import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDetails: (state) => {
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { logout, userDetails } = userSlice.actions;

export default userSlice.reducer;
