import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Category from "./Category";

Enzyme.configure({ adapter: new Adapter() });

const categoryObject ={
  name: 'Plates',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
};

const dummyFunction = () => {return; };

// Testing Category components to be rendering correctly without crashing
// Cases checked includes different value types of category property
describe ('Rendering Category component', () => {
  const div = document.createElement('div');

  describe ('When category object passed', () => {

    it('should renders without crashing', () => {
      ReactDOM.render(<Category category={categoryObject} addToCart={dummyFunction}/>, div);
    });

    let wrapper = shallow(<Category category={categoryObject} addToCart={dummyFunction}/>);

    it('should display correct category information', () => {
      expect(wrapper.find('h1').text()).toBe(categoryObject.name);
    });
  });

  describe ('When empty category object passed', () => {
    const categoryEmpty ={};

    it('should renders without crashing', () => {
      ReactDOM.render(<Category category={categoryEmpty} addToCart={dummyFunction}/>, div);
    });

    let wrapper = shallow(<Category category={categoryEmpty} addToCart={dummyFunction}/>);

    it('should return category header with no info', () => {
      expect(wrapper.find('h1').text()).toBe('');
    });
  });

  ReactDOM.unmountComponentAtNode(div);
});

// Testing data fetching
describe ('Fetching Category Products data', () => {
  it('should fetch data when server returns a successful response', done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Category category={categoryObject} addToCart={dummyFunction}/>);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/products.json');

    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });

});
