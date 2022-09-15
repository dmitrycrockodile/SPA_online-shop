import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addToCart, getTotals } from '../../features/cartSlice';

import ProductCard from '../productCard/ProductCard';

import classes from './productsList.module.css';

class ProductsList extends Component {
   handleAddToCart = (product) => {
      this.props.addToCart(product);
      this.props.getTotals();
   }

   render() {
      const { filter, currencies } = this.props;
      const { items, status, error } = this.props.products;

      const productsList = items.filter(item => item.category === `${filter}` || filter === 'all').map(product => {
                           return <ProductCard item={product}
                                               key={product.id}
                                               currnecy={currencies.currnecy}
                                               handleAddToCart={this.handleAddToCart} />
      });

      return (
         <div className={classes.products}>
            <h1 className={classes.title}>{filter}</h1>
            <ul className={classes.list}>
               { status === 'success' && !error && productsList }
            </ul>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   filter: state.filters,
   products: state.products,
   currencies: state.currencies,
});
export default connect(mapStateToProps, {
   addToCart,
   getTotals
})(ProductsList);

ProductsList.propTypes = {
   addToCart: PropTypes.func.isRequired,
   getTotals: PropTypes.func.isRequired,
   filter: PropTypes.string.isRequired,
   currencies: PropTypes.object.isRequired,
}