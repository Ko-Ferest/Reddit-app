import { configureStore, combineReducers } from "@reduxjs/toolkit";
import redditReducer from "./redditSlice";
import postReducer from "./postSlice";

export default configureStore({
  reducer: combineReducers({
    reddit: redditReducer,
    post: postReducer,
  }),
});
