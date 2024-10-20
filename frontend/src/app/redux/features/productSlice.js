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

//getting all products
export const getAllProducts = createAsyncThunk(
 'product/getAllProducts',
 async (_, { rejectWithValue }) => {
  try {
   const res = await axios.get('http://localhost:8000/api/product', { withCredentials: true });
   return res.data.products;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

//deleting a product
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

const initialState = {
 products: [],
 loading: false,
 success: false,
 error: null
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
    state.error = null;
   })
   .addCase(getAllProducts.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload || 'Failed to fetch products';
   })

   // Handle Delete Product
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
   });
 }
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
