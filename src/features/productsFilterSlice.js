import { createSlice } from '@reduxjs/toolkit';

const filterSilce = createSlice({
   name: '@@filter',
   initialState: 'all',
   reducers: {
      changeFilter: (_, action) => {
         return action.payload
      },
   }
});

export const filterReducer = filterSilce.reducer;
export const { changeFilter } = filterSilce.actions;