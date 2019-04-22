import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NumberPicker from '../number-picker/NumberPicker.js';
import './Product.css';

/*
 * Product component is functional/stateless component
 * used to display every product item in the Fetch API results
 * as a grid item OR a product page accrding to the display mode prop
 * passed from parent component.
 */
const Product = (props) => {
  //Retrieving display mode (grid or page) & addToCart method passed from parent.
  //location prop is used to retrieve product passed via Route component
  //in case of Product Page display mode.
  const {mode, addToCart, location} = props;

  //Retrieving product prop passed from Category parent component (grid mode)
  let {product} = props;

  if(!product) {//if product prop is not directly provided (i.e. not grid mode)
    //check presence of location.state prop before accessing it to get product
    if(location && location.state && location.state.product) {
      product = location.state.product;
    } else {
      product = null;
    }
  }

  if (product) {//if product object successfully retrieved
  return (
      <div className={mode === 'grid'? 'product-grid-item' : 'product-page'}>
        {/* Render Product Grid Item in case of grid mode */}
        {mode === 'grid' &&
          <div>
            <div id={product.id} className="product-image-container" style={{backgroundImage: `url(/media/${product.image})`}}>
              <Link to={{
                pathname:"/product",
                state:{
                  product: product
                }
              }}>
                <div className="button-overlay product-view-button">VIEW DETAILS</div>
              </Link>
              <div
                className="button-overlay product-add-button"
                onClick={() => {addToCart(product, 1);}}
              >ADD TO CART</div>
            </div>
            <h5 className="product-brand">{product.brand}</h5>
            <h4 className="product-title">{product.title}</h4>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>
        }

        {/* Render Product Page in case of page mode */}
        {mode === 'page' &&
          <div className="product-page">
            <div className="product-breadcrumbs">
              <Link to="/">HOME</Link> / <Link to="/">PLATES</Link> / <span className="product-breadcrumbs-current">{product.title}</span>
            </div>
            <div className="product-container">
              <div className="product-image" style={{backgroundImage: `url(/media/${product.image})`}}></div>
              <div className="product-info">
                <div className="product-info-data">
                  <h5 className="product-brand">{product.brand}</h5>
                  <h1 className="page-product-name">{product.title}</h1>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-description">{product.description}</p>
                </div>
                <div className="product-add-container">
                  <NumberPicker
                    numberSelected={1}
                    updateMode="bulk"
                    bulkActionLabel="ADD TO CART"
                    handleBulkAction={(quantity) => {addToCart(product, quantity);}}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  } else {//if product object failed to be retrieved
    return (
      <div className="error-page">
        <h3>Invalid Link</h3>
        <p> Please go to <Link to="/">Home Page</Link></p>
      </div>
    );
  }
}

// Prop types are checked to ensure that
// the correct types are passed from parent component
Product.propTypes = {
  mode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default Product;
