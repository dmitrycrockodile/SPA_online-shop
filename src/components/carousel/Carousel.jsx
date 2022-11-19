import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { CAROUSEL_SLIDE_WIDTH, MIN_CAROUSEL_OFFSET } from '../../utils/constants';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-left.svg';

import classes from './carousel.module.css';

class Carousel extends PureComponent {
   state = {
      offset: MIN_CAROUSEL_OFFSET,
   }

   _maxOffset = -(CAROUSEL_SLIDE_WIDTH * (this.props.arr.length - 1));

   showContent(arr, alt) {
      const slides = arr.map(slide => {
         return <img src={slide} className={classes.img} alt={alt} key={slide} />
      });

      return slides;
   }

   handleDotClick = (index) => {
      this.setState({
         offset: -(CAROUSEL_SLIDE_WIDTH * index)
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
         offset: state.offset + (sign * CAROUSEL_SLIDE_WIDTH)
      }));
   }

   render() {
      const { arr, alt, modalVersion } = this.props;
      const { offset } = this.state;

      const isHiddenButton = (arr.length === 1 || modalVersion) ? {'display': 'none'} : null;

      const arrows = this.props.arrows ? (<><button 
                  className={`${classes.btn} ${classes.btnLeft}`} 
                  onClick={() => this.handleArrowClick('left')}
                  disabled={offset === MIN_CAROUSEL_OFFSET}
                  style={isHiddenButton}
                  aria-label="Left button"
                  ><Arrow role="button" /></button>
               <button 
                  className={`${classes.btn} ${classes.btnRight}`} 
                  onClick={() => this.handleArrowClick('right')}
                  disabled={offset === this._maxOffset}
                  style={isHiddenButton}
                  aria-label="Right button"
                  ><Arrow role="button" /></button></>) : null;

      const dots = this.props.dots ? <div className={classes.dots}> {arr.map((item, i) => {
         return (
            <button className={classes.dot} onClick={() => this.handleDotClick(i)} key={item}><img className={classes.dotImg} src={item} alt={alt}/></button>
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