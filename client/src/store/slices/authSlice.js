import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../helpers/api-communicators";

// Initial state
const initialState = {
  isLoggedIn: false,
  user: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// Async thunks
export const checkStatus = createAsyncThunk("auth/checkStatus", async () => {
  const response = await checkAuthStatus();
  return response;
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await loginUser(email, password);
    return response;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    const response = await signupUser(name, email, password);
    return response;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = !!action.payload;
        state.user = action.payload || null;
      })
      .addCase(checkStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
