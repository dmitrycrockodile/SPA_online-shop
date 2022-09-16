import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { EMPTY_CART_MESSAGE } from '../../../utils/constants';
import { decreaseCart, addToCart, getTotals, clearCart } from '../../../features/cartSlice';

import CartItem from '../../cartItem/CartItem';

import classes from './cartPage.module.css';

class CartPage extends Component {
   onDecrease = (productId) => {
      this.props.decreaseCart(productId)
      this.props.getTotals();
   }

   onIncrease = (product) => {
      this.props.addToCart(product)
      this.props.getTotals();
   }

   onClear = () => {
      this.props.clearCart(); 
      this.props.getTotals();
   }

   render() {
      const { cart, currencies } = this.props;

      const items = cart.cartItems.length === 0 
         ? (<h2 className={classes.makeOrder}>{EMPTY_CART_MESSAGE}</h2>) 
         : cart.cartItems.map(item => {
            const { brand, id, name, productQuantity, attributes, gallery, prices, attributeValues } = item;
            
            return (
               <CartItem key={id} 
                        id={id} 
                        name={name} 
                        brand={brand} 
                        images={gallery}
                        prices={prices}
                        attributes={attributes}
                        quantity={productQuantity}
                        onDecrease={this.onDecrease}
                        onIncrease={this.onIncrease}
                        attributeValues={attributeValues}/>
            )
      });
      
      return (
         <div className={classes.cartPage}>
            <h1 className={classes.title}>Cart</h1>
            <div className={classes.list}>
               {items}
            </div>
            <div className={classes.summary}>
               <div className={classes.checkout}>
                  <div className={classes.total}>
                     <h6>Tax 21%:</h6>
                     <h6>Quantity:</h6>
                     <h5>Total:</h5>
                  </div>
                  <div className={classes.total}>
                     <span>{currencies.currentCurrency}{(cart.totalCartAmount / 100 * 21).toFixed(2)}</span>
                     <span>{cart.totalCartQuantity}</span>
                     <span>{currencies.currentCurrency}{cart.totalCartAmount}</span>
                  </div>
               </div>
               <Link to="/" className={classes.link}>
                  <button className={classes.orderBtn} onClick={() => this.onClear()}>Order</button>
               </Link>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   cart: state.cart,
   currencies: state.currencies,
})

export default connect(mapStateToProps, {
   decreaseCart,
   addToCart,
   getTotals,
   clearCart
})(CartPage);

CartPage.propTypes = {
   decreaseCart: PropTypes.func.isRequired,
   addToCart: PropTypes.func.isRequired,
   getTotals: PropTypes.func.isRequired,
   cart: PropTypes.object.isRequired,
   currencies: PropTypes.object.isRequired,
}