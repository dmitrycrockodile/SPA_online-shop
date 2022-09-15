import { Component } from 'react';
import PropTypes from 'prop-types';

import { carouselSlideWidth, minCarouselOffset } from '../../utils/constants';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-left.svg';

import classes from './carousel.module.css';

class Carousel extends Component {
   state = {
      offset: minCarouselOffset,
   }

   _maxOffset = -(carouselSlideWidth * (this.props.arr.length - 1));

   showContent(arr, alt) {
      const slides = arr.map(slide => {
         return <img src={slide} className={classes.img} alt={alt} key={slide} />
      });

      return slides;
   }

   handleDotClick = (index) => {
      this.setState({
         offset: -(carouselSlideWidth * index)
      });
   }

   handleArrowClick = (side) => {
      let sign;

      if (side === 'left') {
         sign = 1;
      } else if (side === 'right') {
         sign = -1;
      }

      this.setState(state => ({
         offset: state.offset + (sign * carouselSlideWidth)
      }));
   }

   render() {
      const { arr, alt, modalVersion } = this.props;
      const { offset } = this.state;

      const isHiddenButton = (arr.length === 1 || modalVersion) ? {'display': 'none'} : null;

      const arrows = this.props.arrows ? (<><button 
                  className={`${classes.btn} ${classes.btnLeft}`} 
                  onClick={() => this.handleArrowClick('left')}
                  disabled={offset === minCarouselOffset}
                  style={isHiddenButton}
                  ><Arrow /></button>
               <button 
                  className={`${classes.btn} ${classes.btnRight}`} 
                  onClick={() => this.handleArrowClick('right')}
                  disabled={offset === this._maxOffset}
                  style={isHiddenButton}
                  ><Arrow /></button></>) : null;

      const dots = this.props.dots ? <div className={classes.dots}> {arr.map((item, i) => {
         return (
            <button className={classes.dot} onClick={() => this.handleDotClick(i)} key={item}><img src={item} alt={alt}/></button>
         ) 
      })} </div> : null;

      return (
         <div className={classes.carousel}>
            <div className={classes.window}>
               <div className={classes.itemsContainer} style={{transform: `translateX(${offset}%)`}}>
                  {this.showContent(arr, alt)}
               </div>

               {arrows}
            </div>

            {dots}
         </div>
      );
   }
}

export default Carousel;

Carousel.propTypes = {
   arr: PropTypes.arrayOf(PropTypes.string).isRequired,
   alt: PropTypes.string.isRequired,
   modalVersion: PropTypes.bool,
   arrows: PropTypes.bool,
   dots: PropTypes.bool,
}