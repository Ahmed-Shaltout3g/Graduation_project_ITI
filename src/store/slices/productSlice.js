// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await productService.getAll();
});
// ✅ Fetch my products

export const fetchMyProducts = createAsyncThunk(
  "products/fetchMy",
  async () => {
    return await productService.getMyProducts();
  }
);

// ✅ Create product
export const createProduct = createAsyncThunk("products/create", async (data) => {
  return await productService.create(data);
});

// ✅ Update product
export const updateProduct = createAsyncThunk("products/update", async ({ id, data }) => {
  return await productService.update(id, data);
});

// ✅ Delete product
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  return await productService.delete(id);
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
