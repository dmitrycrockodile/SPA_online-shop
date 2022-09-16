import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeCurrency } from '../../features/currencySlice';

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg'; 

import classes from './selectCurrency.module.css';

class CurrencyExchanger extends Component {
   state = {
      isActive: false,
   }

   toggleActive = () => {
      this.setState(({isActive: false}))
   }

   onSelectClick = () => {
      this.setState(({isActive}) => ({
         isActive: !isActive
      }));
   }

   render() {
      const { currencies, changeCurrency } = this.props;
      const { isActive } = this.state;

      const options = currencies.currencies;

      const items = isActive ? (
         <ul className={classes.list} aria-label="Currencies">
            {options.map(value => {
               return <li className={classes.item}
                          onClick={() => {
                              this.toggleActive()
                              changeCurrency(value.symbol)
                           }}
                          key={value.symbol}><button className={classes.btn}>{value.symbol}</button></li>
            })}
         </ul>
      ) : null;

      return (
         <div className={classes.select} aria-label="Currency Exchanger">
            <button className={classes.input} onClick={() => this.onSelectClick()} aria-label="Open currencies list">
               <span className={classes.current}>{ currencies.currentCurrency }</span>
               <Arrow className={isActive ? `${classes.arrow} ${classes.active}` : `${classes.arrow}`} />
            </button>
            <div className={classes.dropdown}>
               { items }
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   currencies: state.currencies
})

export default connect(mapStateToProps, {
   changeCurrency
})(CurrencyExchanger);

CurrencyExchanger.propTypes = {
   currencies: PropTypes.object.isRequired,
   changeCurrency: PropTypes.func.isRequired,
}