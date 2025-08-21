import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "../tools/api";

// Thunk to fetch user
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await callApi({
        url: "http://localhost:5000/auth/me",
        method: "GET",
      });

      // Just return the user, don't try to dispatch here
      return res.user;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await callApi({
        url: "http://localhost:5000/auth/logout",
        method: "POST",
      });

      
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
    },
    setUser: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload; // updates state automatically
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
