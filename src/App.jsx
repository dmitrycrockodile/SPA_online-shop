import { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { 
  ApolloProvider, 
} from '@apollo/client';

import { client } from './utils/queries.js'

import HomePage from './components/pages/HomePage';
import CartPage from './components/pages/cartPage/CartPage.jsx';
import ProductPage from './components/pages/productPage/ProductPage.jsx';
import CartModal from './components/cartModal/CartModal.jsx';
import TheHeader from './components/theHeader/TheHeader';

import classes from './App.module.css';


export default class App extends Component {
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
                <Routes>
                  <Route path="/cart" element={<CartPage/>}/>
                  <Route path="/products/:productId" element={<ProductPage/>}/>
                  <Route path="/" element={<HomePage/>}/>
                </Routes>
              </main>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    );
  }
}