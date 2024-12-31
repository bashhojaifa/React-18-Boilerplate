import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: [],
  },
  reducers: {
    addData: (state, { payload }) => {
      state.auth = payload;
    },
    editAuthData: (state, { payload }) => {
      // Find the index of the item with the id passed in the payload
    },
  },
});

export const { addData, editAuthData } = authSlice.actions;
export default authSlice.reducer;
