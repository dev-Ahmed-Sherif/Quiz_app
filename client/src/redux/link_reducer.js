import { createSlice } from "@reduxjs/toolkit";

export const linkReducer = createSlice({
  name: "links",
  initialState: {
    link: JSON.parse(window.localStorage.getItem("link")),
  },
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setLink } = linkReducer.actions;

export default linkReducer.reducer;
