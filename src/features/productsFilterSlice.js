import { createSlice } from '@reduxjs/toolkit';

import { filterAll } from '../utils/constants';

const filterSilce = createSlice({
   name: '@@filter',
   initialState: filterAll,
   reducers: {
      changeFilter: (_, action) => {
         return action.payload
      },
   }
});

export const filterReducer = filterSilce.reducer;
export const { changeFilter } = filterSilce.actions;