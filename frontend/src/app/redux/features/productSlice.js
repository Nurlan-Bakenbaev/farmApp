import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://farmapp-1.onrender.com';

export const createProduct = createAsyncThunk(
 'product/createProduct',
 async (productData, { rejectWithValue }) => {
  try {
   const res = await axios.post(`${API_BASE_URL}/api/product`, productData, {
    withCredentials: true
   });
   return res.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const getAllProducts = createAsyncThunk(
 'product/getAllProducts',
 async (_, { getState, rejectWithValue }) => {
  const state = getState();

  if (state.product.cached) {
   return state.product.products;
  }

  try {
   const res = await axios.get(`${API_BASE_URL}/api/product`, { withCredentials: true });
   return res.data.products;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const deleteProduct = createAsyncThunk(
 'product/deleteProduct',
 async (productId, { rejectWithValue }) => {
  try {
   await axios.delete(`${API_BASE_URL}/api/product/${productId}`, { withCredentials: true });
   return productId;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const getOneProduct = createAsyncThunk(
 'product/getOneProduct',
 async (productId, { rejectWithValue }) => {
  try {
   const res = await axios.get(`${API_BASE_URL}/api/product/${productId}`, {
    withCredentials: true
   });
   return res.data.product;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

const initialState = {
 products: [],
 loading: false,
 success: false,
 error: null,
 cached: false
};

const productSlice = createSlice({
 name: 'product',
 initialState,
 reducers: {
  resetProductState: (state) => {
   state.products = [];
   state.loading = false;
   state.success = false;
   state.error = null;
   state.cached = false;
  }
 },
 extraReducers: (builder) => {
  builder

   .addCase(createProduct.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.error = null;
   })
   .addCase(createProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    state.products.push(action.payload);
    state.error = null;
   })
   .addCase(createProduct.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload || 'Failed to create product';
   })

   .addCase(getAllProducts.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.error = null;
   })
   .addCase(getAllProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    state.products = action.payload;
    state.cached = true;
    state.error = null;
   })
   .addCase(getAllProducts.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload || 'Failed to fetch products';
   })

   .addCase(deleteProduct.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.error = null;
   })
   .addCase(deleteProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    state.products = state.products.filter((product) => product._id !== action.payload);
    state.error = null;
   })
   .addCase(deleteProduct.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload || 'Failed to delete product';
   })
   .addCase(getOneProduct.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.error = null;
   })
   .addCase(getOneProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    state.singleProduct = action.payload;
    state.error = null;
   })
   .addCase(getOneProduct.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload || 'Failed to fetch product';
   });
 }
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
