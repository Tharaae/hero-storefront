import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import Category from "./category/Category";
import Cart from "./cart/Cart";
import CartPopup from "./cart/CartPopup";
import Product from "./product/Product";

class App extends Component {
  state = {
    cartItems: []
  }

  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  addToCart(product, quantity) {
    const cartItems = this.state.cartItems;
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if(!existingItem) {
      cartItems.push({product, quantity});
    } else {
      existingItem.quantity += quantity;
    }
    this.setState({cartItems});
  }

  removeFromCart(removedItem, quantity) {
    const cartItems = this.state.cartItems;

    if(!quantity || quantity >= removedItem.quantity) {
      this.setState({cartItems: cartItems.filter(item => item.product.id !== removedItem.product.id)});
    } else {
      const existingItem = cartItems.find(item => item.product.id === removedItem.product.id);
      existingItem.quantity -= quantity;
      this.setState({cartItems});
    }
  }

  render() {
    const {cartItems} = this.state;
    return (
      <div className="app">
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
        <Route path="/product/:id"  render={(props) =>
          <Product {...props}
            mode="page"
            addToCart={this.addToCart}
            removeFromCart={this.removeFromCart}
          />}
        />
      </div>
    );
  }
}

export default App;
