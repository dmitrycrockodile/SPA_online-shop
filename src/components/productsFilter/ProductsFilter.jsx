import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeFilter } from '../../features/productsFilterSlice';
import { loadCategories } from '../../features/categoriesSlice';

import classes from './productsFilter.module.css';
import { Link } from 'react-router-dom';

class ProductFilter extends Component {
   state = {
      isActive: null,
   }

   componentDidMount() {
      this.props.loadCategories().then(res => this.setState({isActive: res.payload[0]}));
   }

   render() {
      const { changeFilter, categories } = this.props;

      const items = categories.entities.map(filter => {
         const activee = this.state.isActive === filter;
         const activeClass = activee ? `${classes.link} ${classes.active}` : classes.link;

         return <Link to='/' 
                  className={activeClass} 
                  key={filter}
                  onClick={() => { 
                     changeFilter(filter) 
                     this.setState({isActive: filter})
                  }}
                  href="/">{filter}</Link>
      })

      return (
         <nav className={classes.navigation}>
            {items}
         </nav>
      );
   }
}

const mapStateToProps = (state) => ({
   filter: state.filters,
   categories: state.categories,
});
export default connect(mapStateToProps, {
   changeFilter,
   loadCategories
})(ProductFilter);

ProductFilter.propTypes = {
   loadCategories: PropTypes.func.isRequired,
   changeFilter: PropTypes.func.isRequired,
   categories: PropTypes.object.isRequired,
}