import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from '../product/Product.js';
import './Category.css';

/*
 * Category state component that renders the category information & products.
 * Actually, there is only one category to diplay, but ideally this component
 * should display data according to category object passed from parent.
 */
class Category extends Component {
  // Prop types are checked to ensure that
  // the correct types are passed from parent component
  static propTypes = {
    category: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
  }

  state = {
    products: []
  }

  /* Fetching products data from server right after mounting the component.
     Fetched products are assigned to the componemt state */
  componentDidMount() {
    fetch('/products.json')
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product, index) => {
        product.id = index;
      });
      this.setState({products});
    })
    .catch((error) => {
      console.log(`Error fetching products: ${error}`);
    });
  }

  render() {
    const {products} = this.state;

    // retrieving category object and addToCart function passed as props
    // from parent App component
    const {category, addToCart} = this.props;

    return (
      <div>
        {/* Category Header Info */}
        {category &&
          <div className="category-header">
            <div className="category-title-container">
              <h1>{category.name}</h1>
              <p>{category.description}</p>
            </div>
          </div>
        }

        {/* Products Grid using Product component*/}
        <div className="products-grid">
          {
            products.map((product) => (
              <Product key={product.id} product={product} mode="grid" addToCart={addToCart} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Category;
