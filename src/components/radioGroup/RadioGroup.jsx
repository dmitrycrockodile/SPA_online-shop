import { Component } from 'react';
import PropTypes from 'prop-types';

import { colorAttributeName, whiteColor } from '../../utils/constants';

import classes from './radioGroup.module.css';

class RadioGroup extends Component {
   state = {
      id: this.props.attributes.id,
      current: this.props.attributeValues ? this.props.attributeValues.current : this.props.attributes.items[0].value,
   }

   componentDidMount() {
      if(this.props.onChange) {
         this.onPropertyChange();
      }
   }

   onAttributeChoose(attr) {
      this.setState({current: attr.value}, this.onPropertyChange);
   }

   onPropertyChange() {
      this.props.onChange(this.state);
   }

   render() {
      const { current } = this.state;
      const { attributes, modalVersion, onChange } = this.props;
      const { name, items } = attributes;

      const disabled = !onChange;
      const itemSizeClass = modalVersion ? `${classes.item} ${classes.modal}` : `${classes.item}`;
     
      return (
         <div key={name} className={itemSizeClass}>
            <h6 className={classes.typeTitle}>{name}:</h6>
            <div className={classes.typesContainer}>
               { name === colorAttributeName ? items.map(item =>
               (
                  <button key={item.id} 
                           style={item.value === whiteColor ? {'backgroundColor': `${item.value}`, 'border': '1px solid'} : {'backgroundColor': `${item.value}`}} 
                           className={`${classes.colorAttr} ${current === item.value ? classes.active : ''}`}
                           onClick={() => this.onAttributeChoose(item)}
                           disabled={disabled}></button>
               )) : items.map(item => (
                  <button key={item.id} 
                           className={`${classes.attr} ${current === item.value ? classes.active : ''}`}
                           onClick={() => this.onAttributeChoose(item)}
                           disabled={disabled}>{item.value}</button>
               )) }
            </div>
         </div>
      );
   }
}

export default RadioGroup;

RadioGroup.propTypes = {
   onChange: PropTypes.func,
   attributes: PropTypes.object.isRequired,
   attributeValues: PropTypes.object,
   modalVersion: PropTypes.bool,
}