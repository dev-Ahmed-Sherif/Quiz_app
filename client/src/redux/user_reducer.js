import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    userId: JSON.parse(window.localStorage.getItem("id"))
      ? JSON.parse(window.localStorage.getItem("id"))
      : "",
    userName: JSON.parse(window.localStorage.getItem("Name"))
      ? JSON.parse(window.localStorage.getItem("Name"))
      : "",
    result: [],
  },
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      // console.log(state.userId);
      // console.log(state.userName);
      state.userName = action.payload.name;
      state.userId = action.payload._id;
      // console.log(state.userId);
      // console.log(state.userName);
    },
    pushResultAction: (state, action) => {
      // console.log(action.payload);
      // console.log(state.result);
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
} = userReducer.actions;

export default userReducer.reducer;
