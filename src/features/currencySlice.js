import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ERROR_MESSAGE, CURRENCY, DEFAULT_CURRENCY, LOADING_STATUS, SUCCESS_STATUS, ERROR_STATUS } from "../utils/constants";
import { GET_CURRENCIES } from "../utils/queries";

export const loadCurrencies = createAsyncThunk(
   '@@currencies/load-currencies',
   async () => {
      try {
         const currencies = GET_CURRENCIES();
         return currencies;
      } catch (e) {
         console.log(ERROR_MESSAGE + e.message);
      }
   }
)

const initialState = {
   currentCurrency: localStorage.getItem(CURRENCY) ? JSON.parse(localStorage.getItem(CURRENCY)) : DEFAULT_CURRENCY,
   currencies: [],
   status: LOADING_STATUS,
   error: null,
}

const currenciesSlice = createSlice({
   name: '@@currencies',
   initialState,
   reducers: { 
      changeCurrency: (state, action) => {
         state.currentCurrency = action.payload;
         localStorage.setItem(CURRENCY, JSON.stringify(state.currentCurrency));
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loadCurrencies.pending, (state) => {
            state.status = LOADING_STATUS;
         })
         .addCase(loadCurrencies.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            state.currencies = action.payload;
         })
         .addCase(loadCurrencies.rejected, (state) => {
            state.status = ERROR_STATUS;
            state.error = ERROR_MESSAGE;
         })
   }
});

export const { changeCurrency } = currenciesSlice.actions;
export const currenciesReducer = currenciesSlice.reducer;