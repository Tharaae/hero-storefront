import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NumberPicker from '../number-picker/NumberPicker.js';
import './Product.css';

class Product extends Component {

  render() {
    const {mode, addToCart, location} = this.props;
    let {product} = this.props;

    if(!product) {
      if(location && location.state && location.state.product) {
        product = location.state.product;
      } else {
        product = null;
      }
    }

    if (product) {
    return (
        <div className={mode === 'grid'? 'product-grid-item' : 'product-page'}>
          {mode === 'grid' &&
            <div>
              <div id={product.id} className="product-image-container" style={{backgroundImage: `url(/media/${product.image})`}}>
                <Link to={{
                  pathname:`/product/${product.id}`,
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
                      handleBulkIncrement={(quantity) => {addToCart(product, quantity);}}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
    );
  } else {
    return (
      <div>
        <h3>Invalid Link</h3>
        <p> Please go to <Link to="/">Home Page</Link></p>
      </div>
    );
  }
  }
}

export default Product;
