import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import App from './App';
import Product from './product/Product.js';

Enzyme.configure({ adapter: new Adapter() });

describe ('Rendering App component', () => {
  it('should rendes without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;
  wrapper = shallow(<App />);

  it('should render a Cart Popup', () => {
    expect(wrapper.find('CartPopup')).toHaveLength(1);
  });
});
