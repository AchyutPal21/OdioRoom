import { createSlice } from "@reduxjs/toolkit";

// authSlice.js
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    recipient: "",
    serviceType: "",
    countryCode: ""

  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logoutUser: (state, action) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      // Optional: Show toast with action.payload (error message)
    },
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setVerifyForm(state, action) {
      state.recipient = action.payload.recipient;
      state.serviceType = action.payload.serviceType;
      state.countryCode = action.payload.countryCode;
    }
  }
});

export const { setAccessToken, logoutUser, setCredentials, setVerifyForm } = authSlice.actions;
export default authSlice.reducer;