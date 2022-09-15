import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorMessage, currency, defaultCurrency, loadingStatus, successStatus, errorStatus } from "../utils/constants";
import { GET_CURRENCIES } from "../utils/queries";

export const loadCurrencies = createAsyncThunk(
   '@@currencies/load-currencies',
   async () => {
      try {
         const currencies = GET_CURRENCIES();
         return currencies;
      } catch (e) {
         console.log(errorMessage + e.message);
      }
   }
)

const initialState = {
   currentCurrency: localStorage.getItem(currency) ? JSON.parse(localStorage.getItem(currency)) : defaultCurrency,
   currencies: [],
   status: loadingStatus,
   error: null,
}

const currenciesSlice = createSlice({
   name: '@@currencies',
   initialState,
   reducers: { 
      changeCurrency: (state, action) => {
         state.currentCurrency = action.payload;
         localStorage.setItem(currency, JSON.stringify(state.currentCurrency));
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loadCurrencies.pending, (state) => {
            state.status = loadingStatus;
         })
         .addCase(loadCurrencies.fulfilled, (state, action) => {
            state.status = successStatus;
            state.currencies = action.payload;
         })
         .addCase(loadCurrencies.rejected, (state) => {
            state.status = errorStatus;
            state.error = errorMessage;
         })
   }
});

export const { changeCurrency } = currenciesSlice.actions;
export const currenciesReducer = currenciesSlice.reducer;