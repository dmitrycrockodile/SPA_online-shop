import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from './features/productsFilterSlice';
import { cartReducer } from './features/cartSlice';
import { categoryReducer } from './features/categoriesSlice';
import { currenciesReducer } from './features/currencySlice';
import productsReducer from './features/productsSlice';

export const store = configureStore({
   reducer: {
      filters: filterReducer,
      cart: cartReducer,
      categories: categoryReducer,
      products: productsReducer,
      currencies: currenciesReducer,
   },
   devTools: true,
});