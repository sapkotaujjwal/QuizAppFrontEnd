import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: "basic",
  initialState: {
    loading: false,
    error: false,
    userDetails: false,
    alert: false,
  },
  reducers: {
    showUserDetails: (state) => {

      state.userDetails = true;
    },
    hideUserDetails: (state) => {
      state.userDetails = false;
    },

    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },

    showError: (state) => {
      state.error = state.payload;
    },
    hideError: (state) => {
      state.error = null;
    },

    showAlert: (state) => {
      state.alert = state.payload;
    },
    hideAlert: (state) => {
      state.alert = null;
    },
  },
});

export const {
  showUserDetails,
  hideUserDetails,
  showLoading,
  hideLoading,
  showError,
  hideError,
  showAlert,
  hideAlert,
} = basicSlice.actions;
export default basicSlice.reducer;
