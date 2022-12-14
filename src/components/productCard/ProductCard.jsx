import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { filterPrice } from '../../utils/selectors';

import { ReactComponent as Cart } from '../../assets/icons/cart.svg';

import classes from './productCard.module.css';

class ProductCard extends Component {
   state = {
      attributeValues: [],
   }

   componentDidMount() {
      this.props.item.attributes.map(attr => {
         this.chooseDefault(attr);
         return true;
      });
   }

   onAddToCart = (event, attributeValues) => {
      event.preventDefault();

      this.props.handleAddToCart({...this.props.item, attributeValues});  
   }

   chooseDefault = (attr) => {
      const { items, id } = attr;  

      this.setState(({attributeValues}) => ({
         attributeValues: [...attributeValues, { id, current: items[0].value }]
      }));
   }

   render() {
      const { item, currencies } = this.props;
      const { name, prices, gallery, id, inStock } = item;
      const price = filterPrice(prices, currencies.currentCurrency);
      
      return (
         <li className={classes.product} id={id}>
            <Link className={classes.link} to={`/products/${id}`} aria-label="Link to product page">
               <div className={ inStock ? classes.img : `${classes.img} ${classes.unavailable}`}>
                  <img src={gallery[0]} alt={name} />   
               </div>
               <button className={inStock ? classes.add_btn : classes.invisible} onClick={e => this.onAddToCart(e, this.state.attributeValues)} aria-label="Add to cart">
                  <Cart style={{'width': 24, 'height': 21, 'fill': 'white'}} />
               </button>
               <div className={classes.descr}>
                  <h2 className={classes.title}>{name}</h2>
                  <span className={classes.product_price}>{currencies.currentCurrency}{price}</span>
               </div>
            </Link>
         </li>
      );
   }
}
const mapStateToProps = (state) => ({
   currencies: state.currencies,
});
export default connect(mapStateToProps)(ProductCard);

ProductCard.propTypes = {
   item: PropTypes.object.isRequired,
   currencies: PropTypes.object.isRequired,
   handleAddToCart: PropTypes.func.isRequired,
}