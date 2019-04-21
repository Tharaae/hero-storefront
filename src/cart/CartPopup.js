import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './Cart.css';

class CartPopup extends Component {
  state = {
    isPopupOpen: false
  }

  constructor() {
    super();

    this.openCartPopup = this.openCartPopup.bind(this);
    this.afterOpenCartPopup = this.afterOpenCartPopup.bind(this);
    this.closeCartPopup = this.closeCartPopup.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /*
   * Called when modal is attempted to be opened.
   * It sets the state to rerender accordingly.
   */
  openCartPopup() {
    this.setState({isPopupOpen: true});
    document.addEventListener('mousedown', this.handleClick, false);
  }

  /*
   * Called right after modal is opened.
   * It populates madal elements with data fetched asynchronously.
   */
  afterOpenCartPopup() {
  }

  /*
  * Called when the madal is attempted to bet closed.
  * It sets the state to rerender accordingly.
  */
 closeCartPopup() {
   this.setState({isPopupOpen: false});
   document.removeEventListener('mousedown', this.handleClick, false);
 }

 handleClick(e) {
   if (!document.getElementsByClassName('cart-popup-container')[0].contains(e.target)
      && !document.getElementsByClassName('popup-open-link')[0].contains(e.target)){
     this.closeCartPopup();
   }
 }

  render() {
    const {isPopupOpen} = this.state;
    const {cartItems, addToCart, removeFromCart} = this.props;

    let totalItems = 0;
    let totalPrice = 0;
    for(const item of cartItems) {
      totalItems += item.quantity;
      totalPrice += item.product.price * item.quantity;
    }

    return (
      <div className="cart-main-container">
        <a
          onClick={isPopupOpen? this.closeCartPopup : this.openCartPopup}
          className={isPopupOpen? 'popup-open-link' : 'popup-closed-link'}>
          MY CART {totalItems > 0? `(${totalItems})` : ''}<i></i>
        </a>

        <Modal
          isOpen={this.state.isPopupOpen}
          onAfterOpen={this.afterOpenCartPopup}
          onRequestClose={this.closeCartPopup}
          overlayClassName="cart-popup-overlay"
          className="cart-popup-container"
          contentLabel="My Cart"
        >
          {totalItems === 0 &&
            <div className="cart-empty" >
              YOUR CART IS EMPTY.
            </div>
          }

          {totalItems !== 0 &&
            <div className="popup-items-container">
              {cartItems.map((item) => (
                <div key={item.product.id} className="popup-item">
                  <div className="popup-thumpnail" style={{backgroundImage: `url(/media/${item.product.image})`}}></div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product.title}</p>
                    <p className="popup-item-quantity">{`x ${item.quantity}`}</p>
                    <p className="cart-item-brand">{item.product.brand}</p>
                    <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-remove" onClick={() => {removeFromCart(item, item.quantity);}} >✖</div>
                </div>
              ))}
            </div>
          }
          {totalItems !== 0 &&
            <div className="popup-cart-summary">
              <div className="cart-grid-label cart-summary-label">TOTAL</div>
              <div className="cart-summary-value">${totalPrice.toFixed(2)}</div>
            </div>
          }
          {totalItems !== 0 &&
            <div className="cart-actions">
              <Link to="/cart" className="cart-view-button">
                <div  onClick={() => {this.closeCartPopup();}}>
                  VIEW CART
                </div>
              </Link>
              <div className="cart-checkout-button">
                CHECKOUT
              </div>
            </div>
          }
        </Modal>
      </div>
    );
  }
}

export default CartPopup;
