import { PureComponent } from 'react';

import ProductsList from '../productsList/ProductsList';

class HomePage extends PureComponent {
   render() {
      return (
         <>
            <ProductsList />
         </>
      );
   }
}

export default HomePage;