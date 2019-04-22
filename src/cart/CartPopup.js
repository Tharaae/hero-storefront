import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './Cart.css';

/*
 * Cart Popup state component linked on the main header throughout the app.
 * Implemented using Modal component from react-modal package.
 */
class CartPopup extends Component {
  // Prop types are checked to ensure that
  // the correct types are passed from parent component
  static propTypes = {
    cartItems: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired
  }

  state = {
    //holds the popup state (open or closed)
    isPopupOpen: false
  }

  constructor() {
    super();

    this.openCartPopup = this.openCartPopup.bind(this);
    this.closeCartPopup = this.closeCartPopup.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /* Called when modal is attempted to be opened */
  openCartPopup() {
    //sets the state to rerender accordingly
    this.setState({isPopupOpen: true});
    //add event listner to detect any mouse click to close the modal if click is outside it
    document.addEventListener('mousedown', this.handleClick, false);
  }

  /* Called when the madal is attempted to bet closed */
 closeCartPopup() {
   //sets the state to rerender accordingly
   this.setState({isPopupOpen: false});
   //remove mouse event listner added when modal was open
   document.removeEventListener('mousedown', this.handleClick, false);
 }

 /* Called by mouse event listener when mouse click detected */
 handleClick(e) {
   //if click is outside the modal div or My Cart link (which already closes popup if it's open),
   //then close the popup
   if (!document.getElementsByClassName('cart-popup-container')[0].contains(e.target)
      && !document.getElementsByClassName('popup-open-link')[0].contains(e.target)){
     this.closeCartPopup();
   }
 }

  render() {
    const {isPopupOpen} = this.state;

    //retrieve cart items arry and removeFromCart method
    //passed as props from parent App component
    const {cartItems, removeFromCart} = this.props;

    //get cart summary info
    let totalItems = 0;
    let totalPrice = 0;
    for(const item of cartItems) {
      totalItems += item.quantity;
      totalPrice += item.product.price * item.quantity;
    }

    return (
      <div className="cart-main-container">
        {/*  Renders My Cart link */}
        <a
          onClick={isPopupOpen? this.closeCartPopup : this.openCartPopup}
          className={isPopupOpen? 'popup-open-link' : 'popup-closed-link'}>
          MY CART {totalItems > 0? `(${totalItems})` : ''}<i></i>
        </a>

        {/*  Renders Popup Cart Modal */}
        <Modal
          isOpen={this.state.isPopupOpen}
          onAfterOpen={this.afterOpenCartPopup}
          onRequestClose={this.closeCartPopup}
          overlayClassName="cart-popup-overlay"
          className="cart-popup-container"
          contentLabel="My Cart"
          ariaHideApp={false}
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
