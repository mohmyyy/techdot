import { createSlice } from "@reduxjs/toolkit";

const checkLS = localStorage.getItem("token");
const isPresent = !!checkLS;

const initialAUthState = {
  token: checkLS,
  isToken: isPresent,
};

const authSlice = createSlice({
  name: "AuthStore",
  initialState: initialAUthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isToken = true;
      localStorage.setItem("token", action.payload);
    },
    Logout(state) {
      state.token = "";
      state.isToken = false;
      localStorage.removeItem("token");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
