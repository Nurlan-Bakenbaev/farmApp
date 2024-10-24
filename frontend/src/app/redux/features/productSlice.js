import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://farmapp-1.onrender.com';

const apiClient = axios.create({
 baseURL: API_BASE_URL,
 withCredentials: false
});

// Thunk to create a product
export const createProduct = createAsyncThunk('product/createProduct', async (productData, { rejectWithValue }) => {
 try {
  const res = await apiClient.post('/api/product', productData);
  return res.data;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to create product');
 }
});

// Thunk to get all products
export const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, { rejectWithValue }) => {
 try {
  const res = await apiClient.get('/api/product');
  return res.data.products;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
 }
});

// Thunk to delete a product
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId, { rejectWithValue }) => {
 try {
  await apiClient.delete(`/api/product/${productId}`);
  return productId;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
 }
});

// Thunk to get a single product by ID
export const getOneProduct = createAsyncThunk('product/getOneProduct', async (productId, { rejectWithValue }) => {
 try {
  const res = await apiClient.get(`/api/product/${productId}`);
  return res.data.product;
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
 }
});

// Thunk to like/unlike a product
export const likeProduct = createAsyncThunk('product/likeProduct', async ({ currentUser, productId }, { rejectWithValue }) => {
 try {
  const res = await apiClient.post(`/api/product/${productId}/like`, { userId: currentUser });
  return { productId, likedProducts: res.data.likedProducts };
 } catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Failed to like product');
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
   // Create product
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

   // Get all products
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

   // Delete product
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

   // Get one product
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
   })

   // Like product
   .addCase(likeProduct.pending, (state) => {
    state.loading = true;
    state.success = false;
    state.error = null;
   })
   .addCase(likeProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    const { productId, likedProducts } = action.payload;
    // Update the liked state of the product in the products array
    state.products = state.products.map((product) => {
     if (product._id === productId) {
      return { ...product, isLiked: likedProducts.includes(productId) };
     }
     return product;
    });
    state.error = null;
   })
   .addCase(likeProduct.rejected, (state, action) => {
    state.loading = false;
    state.success = false;
    state.error = action.payload;
   });
 }
});

// Export actions and reducer
export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
