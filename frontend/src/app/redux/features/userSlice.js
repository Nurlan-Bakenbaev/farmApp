import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your base URL for the API
const API_BASE_URL = 'https://farmapp-1.onrender.com';

// Thunk for Sign Up
export const postUser = createAsyncThunk('user/postUser', async (formData, { rejectWithValue }) => {
 try {
  const res = await axios.post(`${API_BASE_URL}/user/signup`, formData, {
   headers: { 'Content-Type': 'multipart/form-data' },
   withCredentials: true
  });
  return res.data;
 } catch (error) {
  const errorMsg = error.response?.data || 'Failed to sign up';
  return rejectWithValue(errorMsg);
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
  const errorMsg = error.response?.data || 'Failed to log in';
  return rejectWithValue(errorMsg);
 }
});

// Thunk for Liking/Unliking a Product
export const likeProduct = createAsyncThunk('user/likeProduct', async ({ currentUser: userId, productId }, { rejectWithValue }) => {
 try {
  const res = await axios.patch(
   `${API_BASE_URL}/user/${userId}/like/${productId}`,
   {},
   {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
   }
  );
  return res.data; // Ensure this returns the updated user object
 } catch (error) {
  const errorMsg = error.response?.data || 'Failed to update like status';
  return rejectWithValue(errorMsg);
 }
});

const userSlice = createSlice({
 name: 'user',
 initialState: {
  user: {
   id: null,
   username: '',
   likedProducts: [] // Initial state for likedProducts
  },
  loading: false,
  error: null
 },
 reducers: {
  setUser: (state, action) => {
   state.user = action.payload;
   localStorage.setItem('user', JSON.stringify(action.payload));
  },
  setUserFromStorage: (state, action) => {
   state.user = action.payload;
  },
  logout: (state) => {
   state.user = {
    id: null,
    username: '',
    likedProducts: [] // Reset liked products on logout
   };
   localStorage.removeItem('user');
  }
 },
 extraReducers: (builder) => {
  builder
   // SIGN UP
   .addCase(postUser.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(postUser.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    userSlice.caseReducers.setUser(state, action); // Calls setUser
   })
   .addCase(postUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   })

   // LOGIN
   .addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    userSlice.caseReducers.setUser(state, action); // Calls setUser
   })
   .addCase(loginUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Failed to log in';
   })

   // LIKE/UNLIKE PRODUCT
   .addCase(likeProduct.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(likeProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;

    // Assuming action.payload contains the updated likedProducts
    state.user = { ...state.user, likedProducts: action.payload.likedProducts };
    userSlice.caseReducers.setUser(state, { payload: state.user }); // Calls setUser
   })
   .addCase(likeProduct.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Failed to update like status';
   });
 }
});

export const { logout, setUserFromStorage, setUser } = userSlice.actions;
export default userSlice.reducer;
