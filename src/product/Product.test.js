import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Product from './Product.js';

Enzyme.configure({ adapter: new Adapter() });

// mock react-router context to avoid violation error
const context = {
  childContextTypes: {
    router: () => void 0,
  },
  context: {
    router: {
      history: {},
      route: {
        location: {
          hash: '',
          pathname: '',
          search: '',
          state: '',
        },
        match: { params: {}, isExact: false, path: '', url: '' },
      }
    }
  }
};

/* Testing Product to be rendering correctly without crashing */
describe ('Rendering Product Component', () => {
  const div = document.createElement('div');

  const productObject = {
    id: 12,
    title: 'title abc',
    brand: 'xyz',
    price: 99,
    description: 'a lot of text to describe'
  };

  const dummyFunction = () => {return; };

  describe ('in full Page mode', () => {
    it('should render without crashing', () => {
      ReactDOM.render(
        <StaticRouter location="someLocation" context={context}>
          <Product product={productObject} mode="page" addToCart={dummyFunction}/>
        </StaticRouter>, div);
    });
  });

  describe ('in grid item mode', () => {
    it('should render without crashing', () => {
      ReactDOM.render(
        <StaticRouter location="someLocation" context={context}>
          <Product product={productObject} mode="grid" addToCart={dummyFunction}/>
        </StaticRouter>, div);
    });
  });

  ReactDOM.unmountComponentAtNode(div);
});
