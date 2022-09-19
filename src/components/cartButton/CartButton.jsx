import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ReactComponent as Cart } from '../../assets/icons/cart.svg';

import classes from './cartButton.module.css';

class CartButton extends Component {   
   render() {
      const { onToggleModal, cart } = this.props;
      
      const counter = cart.totalCartQuantity === 0 
                      ? null 
                      : <span className={classes.counter} aria-label="Total cart quantity">
                           {cart.totalCartQuantity}
                        </span>;

      return (
         <button className={classes.cart} onClick={() => onToggleModal()} aria-label="Open cart">
            <Cart /> 

            {counter}
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