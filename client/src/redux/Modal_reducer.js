import { createSlice } from "@reduxjs/toolkit";

export const modalReducer = createSlice({
  name: "Modal",
  initialState: {
    show: "false",
  },
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setShow } = modalReducer.actions;

export default modalReducer.reducer;
