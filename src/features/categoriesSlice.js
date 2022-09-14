import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GET_CATEGORIES } from "../utils/queries";

export const loadCategories = createAsyncThunk(
   '@@category/load-categories',
   async() => {
      try {
         const categories = await GET_CATEGORIES();
         return categories;
      } catch (e) {
         console.log('Sorry, something went wrong!' + e.message);
      }
   }
)

const categoriesSlice = createSlice({
   name: '@@category',
   initialState: {
      entities: [],
      loading: 'idle', //loading
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