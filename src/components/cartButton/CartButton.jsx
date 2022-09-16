import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ReactComponent as Cart } from '../../assets/icons/cart.svg';

import classes from './cartButton.module.css';

class CartButton extends Component {   
   render() {
      const { onToggleModal, cart } = this.props;

      return (
         <button className={classes.cart} onClick={() => onToggleModal()} aria-label="Open cart">
            <Cart /> 

            <span className={classes.counter} aria-label="Total cart quantity">
               {cart.totalCartQuantity}
            </span>
         </button>
      );
   }
}

const mapStateToProps = (state) => ({
   cart: state.cart
});
export default connect(mapStateToProps)(CartButton);

CartButton.propTypes = {
   onToggleModal: PropTypes.func.isRequired,
   cart: PropTypes.object.isRequired,
}