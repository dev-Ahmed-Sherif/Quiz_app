import { combineReducers, configureStore } from "@reduxjs/toolkit";

/** call reducers */
import quizReducer from "./quiz_reducer";
import userReducer from "./user_reducer";
import linkReducer from "./link_reducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
  user: userReducer,
  link: linkReducer,
});

/** create store with reducer */
export default configureStore({ reducer: rootReducer });
