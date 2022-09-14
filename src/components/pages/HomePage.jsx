import { Component } from 'react';

import ProductsList from '../productsList/ProductsList';

export default class HomePage extends Component {
   render() {
      return (
         <>
            <ProductsList />
         </>
      );
   }
}