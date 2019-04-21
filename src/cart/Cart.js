import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NumberPicker from '../number-picker/NumberPicker.js';
import './Cart.css';


class Cart extends Component {

  render() {
    const {cartItems, addToCart, removeFromCart} = this.props;

    let totalItems = 0;
    let totalPrice = 0;
    for(const item of cartItems) {
      totalItems += item.quantity;
      totalPrice += item.product.price * item.quantity;
    }

    return (
      <div className="cart-page-container">
        <h1>Shopping Cart</h1>
        {totalItems === 0 &&
          <div className="cart-content-container">
            <div className="cart-empty" >
              YOUR CART IS EMPTY.
            </div>
          </div>
        }

        {totalItems !== 0 &&
          <div className="cart-content-container">
            <div className="cart-labels-container">
              <div className="cart-grid-label cart-product">PRODUCT</div>
              <div className="cart-grid-label cart-product-quantity">QUANTITY</div>
              <div className="cart-grid-label cart-product-total">TOTAL</div>
              <div className="cart-grid-label cart-product-action">ACTION</div>
            </div>

            { cartItems.map(item =>
              <div key={item.product.id} className="cart-item-container">
                <div className="cart-product">
                  <div className="cart-thumpnail" style={{backgroundImage: `url(/media/${item.product.image})`}}></div>
                  <div className="cart-item-info">
                    <p className="cart-item-brand">{item.product.brand}</p>
                    <p className="cart-item-name">{item.product.title}</p>
                    <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="cart-product-quantity">
                  <NumberPicker
                    updateMode="live"
                    numberSelected={item.quantity}
                    handleNumberIncrement={() => {addToCart(item.product, 1);}}
                    handleNumberDecrement={() => {removeFromCart(item, 1);}}
                  />
                </div>
                <div className="cart-product-total">
                  <p>${(item.quantity * item.product.price).toFixed(2)}</p>
                </div>
                <div className="cart-product-action cart-remove" onClick={() => {removeFromCart(item, item.quantity);}} >✖</div>
              </div>
            )}
            <div className="cart-summary">
              <div className="cart-summary-item">
                <div className="cart-grid-label">CART OVERVIEW</div>
              </div>
              <div className="cart-summary-item">
                <div className="cart-grid-label cart-summary-label">SUBTOTAL</div>
                <div className="cart-summary-value">${totalPrice.toFixed(2)}</div>
              </div>
              <div className="cart-summary-item">
                <div className="cart-grid-label cart-summary-label">TOTAL</div>
                <div className="cart-summary-value cart-grand-total">${totalPrice.toFixed(2)} CAD</div>
              </div>
            </div>
            <div className="cart-actions cart-page-actions">
              <Link to="/">CONTINUE SHOPPING</Link>
              <div className="cart-checkout-button">
                CHECKOUT
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Cart;
