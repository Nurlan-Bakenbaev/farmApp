import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your base URL for the API
const API_BASE_URL = 'https://farm-7067dausg-kyrgyztruthgmailcoms-projects.vercel.app';

// Thunk for Sign Up
export const postUser = createAsyncThunk('user/postUser', async (formData, { rejectWithValue }) => {
 try {
  const res = await axios.post(`${API_BASE_URL}/user/signup`, formData, {
   headers: { 'Content-Type': 'multipart/form-data' },
   withCredentials: true
  });
  return res.data;
 } catch (error) {
  return rejectWithValue(error.response.data);
 }
});

// Thunk for Login
export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
 try {
  const res = await axios.post(`${API_BASE_URL}/user/signin`, userData, {
   withCredentials: true
  });
  return res.data;
 } catch (error) {
  return rejectWithValue(error.response.data);
 }
});

// Thunk for Liking/Unliking a Product
export const likeProduct = createAsyncThunk(
 'user/likeProduct',
 async ({ userId, productId }, { rejectWithValue }) => {
  try {
   const res = await axios.patch(
    `${API_BASE_URL}/user/${userId}/like/${productId}`,
    {},
    {
     headers: { 'Content-Type': 'application/json' },
     withCredentials: true
    }
   );
   return res.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

const userSlice = createSlice({
 name: 'user',
 initialState: {
  user: null,
  loading: false,
  error: null
 },
 reducers: {
  setUserFromStorage: (state, action) => {
   state.user = action.payload;
  },
  logout: (state) => {
   state.user = null;
   localStorage.removeItem('user');
  }
 },
 extraReducers: (builder) => {
  // SIGN UP
  builder
   .addCase(postUser.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(postUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
    localStorage.setItem('user', JSON.stringify(action.payload));
   })
   .addCase(postUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   });

  // LOGIN
  builder
   .addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
    localStorage.setItem('user', JSON.stringify(action.payload));
   })
   .addCase(loginUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Failed to log in';
   });

  // LIKE/UNLIKE PRODUCT
  builder
   .addCase(likeProduct.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(likeProduct.fulfilled, (state, action) => {
    state.loading = false;

    state.user = action.payload;

    state.error = null;

    localStorage.setItem('user', JSON.stringify(state.user));
   })
   .addCase(likeProduct.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Failed to update like status';
   });
 }
});

export const { logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
