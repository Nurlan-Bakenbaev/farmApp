import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//thunk for Create a product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    console.log(productData);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/product",
        productData,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  product: null,
  loading: false,
  success: false,
  error: null,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.product = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
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
        state.product = action.payload;
        state.error = null;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create product";
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
