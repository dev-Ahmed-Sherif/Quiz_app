import { combineReducers, configureStore } from "@reduxjs/toolkit";

/** call reducers */
import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";
import linkReducer from "./link_reducer";

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
  link: linkReducer,
});

/** create store with reducer */
export default configureStore({ reducer: rootReducer });
