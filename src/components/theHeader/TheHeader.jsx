import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CurrencyExchanger from '../currencyExchanger/SelectCurrency';
import ProductsFilter from '../productsFilter/ProductsFilter';
import CartButton from '../cartButton/CartButton';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import classes from './theHeader.module.css';

class TheHeader extends PureComponent {
   render() {
      return (
         <header className={classes.header}>
            <ProductsFilter />

            <Link className={classes.logo} aria-label="Shop logo" to='/'><Logo/></Link>

            <div className={classes.actions}>
               <CurrencyExchanger />
               <CartButton onToggleModal={this.props.onToggleModal} />
            </div>
         </header>
      );
   }
}

export default TheHeader;

TheHeader.propTypes = {
   onToggleModal: PropTypes.func.isRequired,
}