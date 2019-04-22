import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Category from "./category/Category";
import Cart from "./cart/Cart";
import CartPopup from "./cart/CartPopup";
import Product from "./product/Product";

/*
 * App state component displays the store home page.
 * It renders the store header, navigation menu and shopping cart Link
 * that are displayed on every app seaction.
 * It keeps the state of current shopping cart items/quantities
 * which is used throughout the app.
 */
class App extends Component {
  state = {
    //Array of items currently in shopping cart
    cartItems: []
  }

  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  /* Adds quantity of a product to shopping cart */
  addToCart(product, quantity) {
    const cartItems = this.state.cartItems;

    //get cart item of product if exists in cart
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if(!existingItem) { //if item does not exists in cart, add it
      cartItems.push({product, quantity});
    } else { //if item already exists in cart, update its quantity
      existingItem.quantity += quantity;
    }
    //reflect cart updates to re-render
    this.setState({cartItems});
  }

  /* Removes quantity of a product from shopping cart */
  removeFromCart(removedItem, quantity) {
    const cartItems = this.state.cartItems;

    //if removed quantity greater than or equal to the current cart item quantity,
    //then delete the product from the shopping cart
    if(!quantity || quantity >= removedItem.quantity) {
      this.setState({cartItems: cartItems.filter(item => item.product.id !== removedItem.product.id)});
    } else { // else, update the quantity
      const existingItem = cartItems.find(item => item.product.id === removedItem.product.id);
      existingItem.quantity -= quantity;
      this.setState({cartItems});
    }
  }

  render() {
    const {cartItems} = this.state;

    return (
      <div className="app">
        {/* Header section */}
        <header className="app-header">
          <div className="logo-container">
            <img src="/media/logo.png" className="logo" alt="logo" />
          </div>
          <nav className="menu-container">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li className="dropdown">
                <Link to="/" className="trigger-drop">SHOP<i></i></Link>
              </li>
              <li><Link to="/">JOURNAL</Link></li>
              <li className="dropdown">
                <Link to="/" className="trigger-drop">MORE<i></i></Link>
              </li>
            </ul>
          </nav>
          <div className="cart-link-container dropdown">
            <CartPopup cartItems={cartItems} addToCart= {this.addToCart} removeFromCart={this.removeFromCart}/>
          </div>
        </header>

        {/* Page Content section displayed according to path */}
        <Switch>
          <Route
            exact path="/"
            render={(props) =>
              <Category {...props}
                category={{
                  name: 'Plates',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
                }}
                addToCart={this.addToCart}
              />}
            />
          <Route path="/cart" render={(props) =>
            <Cart {...props}
              cartItems={cartItems}
              addToCart={this.addToCart}
              removeFromCart={this.removeFromCart}
            />}
          />
          <Route path="/product"  render={(props) =>
            <Product {...props}
              mode="page"
              addToCart={this.addToCart}
              removeFromCart={this.removeFromCart}
            />}
          />
          <Route render={() =>
            <div className="error-page">
              <h3>Invalid Page Address</h3>
              <p> Please go to <Link to="/">Home Page</Link></p>
            </div>}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
