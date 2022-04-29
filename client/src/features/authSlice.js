import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login } from "../API/index";

const initialState = {
  userData: null,
  isError: null,
  isSuccess: false,
  isLoading: false,
  message: null,
  googleAuth: false,
};

export const SignUp = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signup(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.privilege
      );
      localStorage.setItem("user", response.data.token);
      return response.data;
    } catch (error) {
      const err = error.response.data.message;
      return rejectWithValue(err);
    }
  }
);

export const SignIn = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data.email, data.password);
      localStorage.setItem("user", response.data.token);
      return response.data;
    } catch (error) {
      const err = error.response.data.message;
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveLocalToken: (state) => {
      const token = localStorage.getItem("user");
      const googleAuth = localStorage.getItem("googleAuth");
      if (token) {
        state.userData = token;
      }
      if (googleAuth) {
        state.googleAuth = googleAuth;
      }
    },
    googleAuth: (state, action) => {
      state.googleAuth = true;
      state.userData = action.payload;
      localStorage.setItem("googleAuth", state.googleAuth);
      localStorage.setItem("user", action.payload);
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("googleAuth");
      state.userData = null;
      state.isError = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = null;
      state.googleAuth = false;
    },
  },
  extraReducers: {
    [SignUp.pending]: (state, action) => {
      state.isLoading = true;
    },
    [SignUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload.token;
      state.message = action.payload.message;
    },
    [SignUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [SignIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [SignIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload.token;
      state.message = action.payload.message;
    },
    [SignIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default authSlice;
