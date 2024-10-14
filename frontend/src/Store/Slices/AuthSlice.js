import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
};

const backendURL = `${import.meta.env.VITE_API_URL}/auth`;

export const signupUser = createAsyncThunk(
  '/auth/signup',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendURL}/signup`, formData, {
        withCredentials: true,
      });

      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendURL}/login`, formData, {
        withCredentials: true,
      });

      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  '/auth/checkauth',

  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/check-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control':
            'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = null;
      })
      .addCase(signupUser.rejected, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
        sessionStorage.setItem(
          'token',
          JSON.stringify(action.payload.accessToken)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetTokenAndCredentials } = authSlice.actions;

export default authSlice.reducer;
