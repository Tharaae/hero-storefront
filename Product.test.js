import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Product from './Product.js';

Enzyme.configure({ adapter: new Adapter() });

describe ('Rendering Product Component', () => {

  let wrapper = shallow(<Product />);

  it('should render Invalid Link message', () => {
    expect(wrapper.find('h3').text()).toBe('Invalid Link');
  });
}

/* Testing Product to be rendering correctly without crashing */
// describe ('Rendering Product Component', () => {
//   const div = document.createElement('div');
//
//     describe ('when product object passed', () => {
//       it('should render without crashing', () => {
//         const productObject = {
//           id: 12,
//           title: 'title abc',
//           brand: 'xyz',
//           price: 99,
//           description: 'a lot of text to describe'
//         };
//         ReactDOM.render(<Product product={productObject} mode="page"/>, div);
//       });
//     });
//
//     describe ('when empty product object passed', () => {
//       it('should renders without crashing', () => {
//         const productEmpty = {};
//         ReactDOM.render(<Product product={productEmpty} mode="page"/>, div);
//       });
//     });
//
//     describe ('when NO product object passed', () => {
//       it('should renders without crashing', () => {
//         ReactDOM.render(<Product mode="page"/>, div);
//       });
//     });
//
//   ReactDOM.unmountComponentAtNode(div);
// });
