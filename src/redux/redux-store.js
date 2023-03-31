import { createSlice } from "@reduxjs/toolkit";

const checkForToken = localStorage.getItem("token");
const checkForEMail = localStorage.getItem("email");
const isPresent = !!checkForToken;

const initialAUthState = {
  token: checkForToken,
  isToken: isPresent,
  email: checkForEMail,
};

const authSlice = createSlice({
  name: "AuthStore",
  initialState: initialAUthState,
  reducers: {
    login(state, action) {
      const userEmailId = action.payload.email.replace(/[^a-zA-Z0-9 ]/g, "");
      state.email = userEmailId
      state.token = action.payload.idToken;
      state.isToken = true;
      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("email", userEmailId);
    },
    Logout(state) {
      state.token = "";
      state.isToken = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
