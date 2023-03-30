import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux-store";

const store = configureStore({
  reducer: authReducer,
});
export default store;
