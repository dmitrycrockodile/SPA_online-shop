import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loadingStatus, errorMessage, successStatus, errorStatus } from "../utils/constants";
import { GET_PRODUCTS, GET_PRODUCT } from "../utils/queries";

export const loadProducts = createAsyncThunk(
   '@@products/load-products',
   async() => {
      try {
         const products = GET_PRODUCTS();
         return products;
      } catch (e) {
         console.log(errorMessage + e.message);
      }
   } 
)

export const loadProduct = createAsyncThunk(
   '@@products/load-product',
   async(id) => {
      try {
         const product = await GET_PRODUCT(id);
         return product;
      } catch (e) {
         console.log(errorMessage + e.message);
      }
   }
)

const initialState = {
   items: [],
   item: {},
   status: loadingStatus,
   error: null,
};

const productsSlice = createSlice({
   name: '@@products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loadProducts.fulfilled, (state, action) => {
            state.items = action.payload;
         })
         .addCase(loadProduct.fulfilled, (state, action) => {
            state.item = action.payload;
         })
         .addMatcher((action) => action.type.endsWith('/pending'), (state, action) => {
            state.status = loadingStatus;
         })
         .addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
            state.status = successStatus;
         })
         .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
            state.status = errorStatus;
            state.error = errorMessage;
         })
   }
});

export default productsSlice.reducer;