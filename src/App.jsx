import { Component, lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { 
  ApolloProvider, 
} from '@apollo/client';

import { client } from './utils/queries.js'

import CartModal from './components/cartModal/CartModal.jsx';
import TheHeader from './components/theHeader/TheHeader';

import classes from './App.module.css';

const CartPage = lazy(() => import('./components/pages/cartPage/CartPage.jsx'));
const ProductPage = lazy(() => import('./components/pages/productPage/ProductPage.jsx'));
const HomePage = lazy(() => import('./components/pages/HomePage'));

class App extends Component {
  state = {
    modalIsOpen: false,
  }

  onToggleModal = () => {
    this.setState(({modalIsOpen}) => ({
      modalIsOpen: !modalIsOpen,
    }));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className={classes.App}>
          <BrowserRouter>
            <TheHeader onToggleModal={this.onToggleModal}/>
            <CartModal onToggleModal={this.onToggleModal} isOpen={this.state.modalIsOpen} />
              <main>
                <Suspense fallback={<span>'Loading...'</span>}>
                  <Routes>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/products/:productId" element={<ProductPage/>}/>
                    <Route path="/" element={<HomePage/>}/>
                  </Routes>
                </Suspense>
              </main>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;