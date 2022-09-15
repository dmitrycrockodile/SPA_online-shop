import { createSlice } from '@reduxjs/toolkit';

import { FILTER_ALL } from '../utils/constants';

const filterSilce = createSlice({
   name: '@@filter',
   initialState: FILTER_ALL,
   reducers: {
      changeFilter: (_, action) => {
         return action.payload
      },
   }
});

export const filterReducer = filterSilce.reducer;
export const { changeFilter } = filterSilce.actions;