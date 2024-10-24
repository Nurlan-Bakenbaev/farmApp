import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://farmapp-1.onrender.com';

const apiClient = axios.create({
 baseURL: API_BASE_URL,
 withCredentials: false
});

export const createProduct = createAsyncThunk('product/createProduct', async (productData, { rejectWithValue }) => {
 try {
  const res = await apiClient.post('/api/product', productData);
  return res.data;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to create product');
 }
});

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, { rejectWithValue }) => {
 try {
  const res = await apiClient.get('/api/product');
  return res.data.products;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
 }
});

// Thunk to delete a product by ID
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId, { rejectWithValue }) => {
 try {
  await apiClient.delete(`/api/product/${productId}`);
  return productId;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
 }
});

export const getOneProduct = createAsyncThunk('product/getOneProduct', async (productId, { rejectWithValue }) => {
 try {
  const res = await apiClient.get(`/api/product/${productId}`);
  return res.data.product;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
 }
});

const initialState = {
 products: [],
 loading: false,
 success: false,
 error: null,
 singleProduct: null
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
   state.singleProduct = null;
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
    state.error = action.payload;
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
    state.error = null;
   })
   .addCase(getAllProducts.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload;
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
    state.error = action.payload;
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
    state.error = action.payload;
   });
 }
});

// Export actions and reducer
export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
