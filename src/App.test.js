import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import App from './App';
import Category from "./category/Category";
import Product from './product/Product.js';



/* Testing components to be rendering correctly without crashing */
describe ('Rendering', () => {

  // Testing main App component renedering
  describe('App component', () => {
    it('should rendes without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  // Testing Category component rendering
  describe('Category component', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');

      describe ('when category object passed', () => {
        it('should renders without crashing', () => {
          const categoryObject ={
            name: 'Plates',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
          };
          ReactDOM.render(<Category category={categoryObject} />, div);
        });
      });

      describe ('when empty category object passed', () => {
        it('should renders without crashing', () => {
          const categoryEmpty ={};
          ReactDOM.render(<Category category={categoryEmpty} />, div);
        });
      });

      describe ('when NO category object passed', () => {
        it('should renders without crashing', () => {
          ReactDOM.render(<Category />, div);
        });
      });
    });

    ReactDOM.unmountComponentAtNode(div);

    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />);
    });

    it('should render Cart Popup', () => {
      expect(wrapper.find('CartPopup')).toHaveLength(1);
    });
  });

  // Testing Product component rendering
  describe('Product component', () => {
    it('should renders without crashing', () => {
      const div = document.createElement('div');

      describe ('when product object passed', () => {
        it('should renders without crashing', () => {
          const productObject = {
            id: 12,
            title: 'title abc',
            brand: 'xyz',
            price: 99,
            description: 'a lot of text to describe'
          };
          ReactDOM.render(<Product product={productObject} />, div);
        });
      });

      describe ('when empty product object passed', () => {
        it('should renders without crashing', () => {
          const productEmpty = {};
          ReactDOM.render(<Product product={productEmpty} />, div);
        });
      });

      describe ('when NO product object passed', () => {
        it('should renders without crashing', () => {
          ReactDOM.render(<Product />, div);
        });
      });
    });

    ReactDOM.unmountComponentAtNode(div);
  });
});
