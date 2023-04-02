import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux-store";
import mailReducer from "./redux-mails";

const store = configureStore({
  reducer: { auth: authReducer, mail: mailReducer },
});
export default store;
