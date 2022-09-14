import { Component } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Cart } from '../../assets/icons/cart.svg';

import classes from './cartButton.module.css';

class CartButton extends Component {   
   render() {
      return (
         <div className={classes.cart} onClick={() => this.props.onToggleModal()}>
            <Cart /> 

            <span className={classes.counter}>
               {this.props.cart.totalCartQuantity}
            </span>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   cart: state.cart
});
export default connect(mapStateToProps)(CartButton);