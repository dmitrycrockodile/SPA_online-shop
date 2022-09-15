import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { LOADING_STATUS, ERROR_MESSAGE } from "../utils/constants";
import { GET_CATEGORIES } from "../utils/queries";

export const loadCategories = createAsyncThunk(
   '@@category/load-categories',
   async() => {
      try {
         const categories = await GET_CATEGORIES();
         return categories;
      } catch (e) {
         console.log(ERROR_MESSAGE + e.message);
      }
   }
)

const categoriesSlice = createSlice({
   name: '@@category',
   initialState: {
      entities: [],
      loading: LOADING_STATUS, 
      error: null
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loadCategories.fulfilled, (state, action) => {
            state.entities = action.payload;
         })
   }
});

export const categoryReducer = categoriesSlice.reducer;