import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    userName: null,
    result: [],
  },
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      state.userName = action.payload.username;
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload;
      /* Update the value of previous question */
      state.result.fill(checked, trace, trace + 1);
    },
    resetResultAction: () => {
      return {
        userId: null,
        result: [],
      };
    },
  },
});

export const {
  setUser,
  pushResultAction,
  resetResultAction,
  updateResultAction,
} = resultReducer.actions;

export default resultReducer.reducer;
