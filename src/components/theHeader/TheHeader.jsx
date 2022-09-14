import { Component } from 'react';
import { Link } from 'react-router-dom';

import CurrencyExchanger from '../currencyExchanger/SelectCurrency';
import ProductsFilter from '../productsFilter/ProductsFilter';
import CartButton from '../cartButton/CartButton';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import classes from './theHeader.module.css';

export default class TheHeader extends Component {
   render() {
      return (
         <header className={classes.header}>
            <ProductsFilter />

            <Link to='/'><Logo /></Link>

            <div className={classes.actions}>
               <CurrencyExchanger />
               <CartButton onToggleModal={this.props.onToggleModal} />
            </div>
         </header>
      );
   }
}