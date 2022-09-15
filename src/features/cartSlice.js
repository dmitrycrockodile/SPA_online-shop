import { createSlice } from "@reduxjs/toolkit";

import { filterPrice } from "../utils/selectors";
import { CART_ITEMS, CURRENCY, DEFAULT_CURRENCY } from "../utils/constants";
import { changeCurrency } from "./currencySlice";

const initialState = {
   cartItems: localStorage.getItem(CART_ITEMS) ? JSON.parse(localStorage.getItem(CART_ITEMS)) : [],
   totalCartAmount: 0,
   totalCartQuantity: 0,
   status: null,
   error: null,
   currency: localStorage.getItem(CURRENCY) ? JSON.parse(localStorage.getItem(CURRENCY)) : DEFAULT_CURRENCY,
}

const cartSlice = createSlice({
   name: '@@cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const items = state.cartItems;

         if (action.payload.attributeValues) {
            const attributes = action.payload.attributeValues.map(item => item.current);
            action.payload.id = attributes.length === 0 ? `${action.payload.id}` : `${action.payload.id} ${attributes}`;
         }
         
         const idx = items.findIndex(item => item.id === action.payload.id);
        
         if (idx >= 0) {
            items[idx].productQuantity += 1;
         } else {
            items.push({...action.payload, productQuantity: 1});
         }

         localStorage.setItem(CART_ITEMS, JSON.stringify(state.cartItems));
      },
      decreaseCart: (state, action) => {
         const items = state.cartItems;
         const idx = items.findIndex(item => item.id === action.payload);

         if (items[idx].productQuantity > 1) {
            items[idx].productQuantity -= 1;
         } else if (items[idx].productQuantity === 1) {
            const newCartItems = items.filter(
               item => item.id !== action.payload
            )

            state.cartItems = newCartItems;
         }

         localStorage.setItem(CART_ITEMS, JSON.stringify(state.cartItems));
      },
      getTotals: (state) => {
         let { total, quantity } = state.cartItems.reduce(
            (cartTotal, cartItem) => {
               const { prices, productQuantity } = cartItem;
               const price = filterPrice(prices, state.currency);
               const itemTotal = price * productQuantity;

               //overcoming accurate calculations
               cartTotal.total = ((cartTotal.total.toFixed(2) * 1000 + itemTotal.toFixed(2) * 1000) / 1000);
               cartTotal.quantity += productQuantity;

               return cartTotal;
            },
            {
               total: 0,
               quantity: 0,
            }
         )

         state.totalCartAmount = total;
         state.totalCartQuantity = quantity;
      },
      clearCart: (state) => {
         state.cartItems = [];
         localStorage.setItem(CART_ITEMS, JSON.stringify(state.cartItems));
      }
   }, 
   extraReducers: (builder) => {
      builder.addCase(changeCurrency, (state, action) => {
         state.currency = action.payload;
      })
   }
});

export const { addToCart, decreaseCart, getTotals, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;