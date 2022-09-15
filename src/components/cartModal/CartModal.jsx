import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { emptyCartMessage } from '../../utils/constants';
import { decreaseCart, addToCart, getTotals } from '../../features/cartSlice';

import CartItem from '../cartItem/CartItem';

import classes from './cartModal.module.css';

class CartModal extends Component {
   componentDidUpdate() {
      this.props.getTotals();
   }

   onDecrease = (productId) => {
      this.props.decreaseCart(productId);
   }

   onIncrease = (product) => {
      this.props.addToCart(product);
   }

   render() {
      const { cart, onToggleModal, isOpen, currencies } = this.props;

      const items = cart.cartItems.length === 0 ? (<h2>{emptyCartMessage}</h2>) : cart.cartItems.map(item => {
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
                     modalVersion={true}
                     attributeValues={attributeValues}/>
         )
      });

      return (
         <div className={isOpen ? `${classes.cartModal} ${classes.open}` : `${classes.cartModal}`} onClick={() => onToggleModal()}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
               <h5 className={classes.title}>My Bag, <span>{cart.totalCartQuantity} items</span></h5>
               <ul className={classes.list}>
               {items}
               </ul>
               <div className={classes.price}>
                  <h5>Total</h5>
                  <span>{currencies.currentCurrency}{cart.totalCartAmount}</span>
               </div>
               <div className={classes.buttons}>
                  <Link to='/cart' className={classes.btn} onClick={() => onToggleModal()}>
                     View bag
                  </Link>
                  <button className={classes.btn}>Check out</button>
               </div>
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
   getTotals,
   decreaseCart,
   addToCart,
})(CartModal);

CartModal.propTypes = {
   cart: PropTypes.object.isRequired,
   onToggleModal: PropTypes.func.isRequired,
   isOpen: PropTypes.bool.isRequired,
   currencies: PropTypes.object.isRequired,
   addToCart: PropTypes.func.isRequired,
   decreaseCart: PropTypes.func.isRequired,
   getTotals: PropTypes.func.isRequired,
}