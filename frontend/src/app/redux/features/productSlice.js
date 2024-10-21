import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// creating a product
export const createProduct = createAsyncThunk(
 'product/createProduct',
 async (productData, { rejectWithValue }) => {
  try {
   const res = await axios.post('http://localhost:8000/api/product', productData, {
    withCredentials: true
   });
   return res.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

// getting all products
export const getAllProducts = createAsyncThunk(
 'product/getAllProducts',
 async (_, { getState, rejectWithValue }) => {
  //  caching
  const state = getState();

  if (state.product.cached) {
   return state.product.products;
  }

  try {
   const res = await axios.get('http://localhost:8000/api/product', { withCredentials: true });
   return res.data.products;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

// deleting a product
export const deleteProduct = createAsyncThunk(
 'product/deleteProduct',
 async (productId, { rejectWithValue }) => {
  try {
   await axios.delete(`http://localhost:8000/api/product/${productId}`, { withCredentials: true });
   return productId;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

// getting one product
export const getOneProduct = createAsyncThunk(
 'product/getOneProduct',
 async (productId, { rejectWithValue }) => {
  try {
   const res = await axios.get(`http://localhost:8000/api/product/${productId}`, {
    withCredentials: true
   });
   return res.data.product;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

// Initial state
const initialState = {
 products: [],
 loading: false,
 success: false,
 error: null,
 cached: false
};

// Product slice
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
   // Handle create product
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

   // Handle get all products
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

   // Handle delete product
   .addCase(deleteProduct.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.error = null;
   })
   .addCase(deleteProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    state.products = state.products.filter((product) => product._id !== action.payload); // Remove the deleted product
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

// Export actions and reducer
export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
