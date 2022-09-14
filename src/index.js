import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { loadProducts } from './features/productsSlice';
import { getTotals } from './features/cartSlice';
import { loadCurrencies } from './features/currencySlice';

import App from './App';

import './index.css';
import './assets/style/style.css';

store.dispatch(loadProducts());
store.dispatch(getTotals());
store.dispatch(loadCurrencies());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);