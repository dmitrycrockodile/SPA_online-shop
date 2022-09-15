import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RadioGroup from '../radioGroup/RadioGroup';
import Carousel from '../carousel/Carousel';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/icons/minus.svg';

import classes from './cartItem.module.css';

class CartItem extends Component {
   render() {
      const { id, brand, name, quantity, attributes, images, prices, onDecrease, onIncrease, attributeValues, modalVersion, currencies } = this.props;

      const price = prices.filter(price => price.currency.symbol === currencies.currentCurrency).map(item => item.amount);
      const itemSizeClass = modalVersion ? `${classes.item} ${classes.modal}` : `${classes.item}`;

      const attributess = attributes.map((attr, i) => {
         return ( 
            <RadioGroup 
               key={attr.name}
               attributes={attr}
               attributeValues={attributeValues[i]} 
               modalVersion={modalVersion}/>
         ) 
      });


      return (
         <li className={itemSizeClass} id={id}>
            <div className={classes.info}>
               <h2 className={classes.title}><span>{brand}</span><br/> {name}</h2>
               <span className={classes.price}>{currencies.currentCurrency}{price}</span>
               {attributess}
            </div>
            <div className={classes.counter}>
               <button className={classes.counterBtn} onClick={() => onIncrease({id})}>
                  <PlusIcon />
               </button>
               <span>{quantity}</span>
               <button className={classes.counterBtn} onClick={() => onDecrease(id)}>
                  <MinusIcon />
               </button>
            </div>
            <div className={classes.imageContainer}>
               <Carousel arr={images} alt={name} modalVersion={modalVersion} arrows={!modalVersion}/>
            </div>
         </li>
      );
   }
}

const mapStateToProps = (state) => ({
   currencies: state.currencies,
});
export default connect(mapStateToProps)(CartItem);

CartItem.propTypes = {
   id: PropTypes.string.isRequired,
   brand: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   quantity: PropTypes.number.isRequired,
   attributes: PropTypes.arrayOf(PropTypes.object),
   images: PropTypes.arrayOf(PropTypes.string).isRequired,
   prices: PropTypes.arrayOf(PropTypes.object).isRequired,
   onDecrease: PropTypes.func.isRequired,
   onIncrease: PropTypes.func.isRequired,
   attributeValues: PropTypes.array,
   modalVersion: PropTypes.bool,
   currencies: PropTypes.object.isRequired,
}