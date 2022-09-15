import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ReactComponent as Cart } from '../../assets/icons/cart.svg';

import classes from './cartButton.module.css';

class CartButton extends Component {   
   render() {
      const { onToggleModal, cart } = this.props;

      return (
         <div className={classes.cart} onClick={() => onToggleModal()}>
            <Cart /> 

            <span className={classes.counter}>
               {cart.totalCartQuantity}
            </span>
         </div>
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