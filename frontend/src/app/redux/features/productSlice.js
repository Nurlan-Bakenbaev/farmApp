import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//thunk for Create a product
export const createProduct = createAsyncThunk('product/createProduct', async (productData, { rejectWithValue }) => {
 try {
  const res = await axios.post('http://localhost:8000/api/product', productData, { withCredentials: true });
  console.log(productData);
  return res.data;
 } catch (error) {
  return rejectWithValue(error.response.data);
 }
});

//Get All products
export const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, { rejectWithValue }) => {
 try {
  const res = await axios.get('http://localhost:8000/api/product', { withCredentials: true });
  return res.data.products;
 } catch (error) {
  return rejectWithValue(error.response.data);
 }
});
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
  resetProductState: state => {
   state.products = [];
   state.loading = false;
   state.success = false;
   state.error = null;
  }
 },
 extraReducers: builder => {
  builder

   .addCase(createProduct.pending, state => {
    state.loading = true;
    state.success = false;
    state.error = null;
   })

   .addCase(createProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    state.product = action.payload;
    state.error = null;
   })

   .addCase(createProduct.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload || 'Failed to create product';
   }) // Handle actions for fetching products
   .addCase(getAllProducts.pending, state => {
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
   });
 }
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
