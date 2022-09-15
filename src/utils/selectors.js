export const filterPrice = (arr, currencySymbol) => {
   return arr.filter(price => price.currency.symbol === currencySymbol).map(item => item.amount);
}