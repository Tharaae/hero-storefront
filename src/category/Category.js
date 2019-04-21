import React, { Component } from 'react';
import Product from '../product/Product.js';
import './Category.css';

class Category extends Component {
  state = {
    products: []
  }

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
    const {category, addToCart} = this.props;

    return (
      <div>
        <div className="category-header">
          <div className="category-title-container">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </div>
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
