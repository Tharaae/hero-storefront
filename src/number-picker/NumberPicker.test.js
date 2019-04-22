import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import NumberPicker from "./NumberPicker";

Enzyme.configure({ adapter: new Adapter() });

describe('Rendering NumberPicker component', () => {

  const picker = shallow(<NumberPicker />);

  it('should render the expected elements', () => {
    expect(picker.find('div.number-picker-container')).toHaveLength(1);
    expect(picker.find('div.number-picked')).toHaveLength(1);
    expect(picker.find('div.number-changers-container')).toHaveLength(1);
    expect(picker.find('div.number-changer')).toHaveLength(2);
  });

  describe('When no selectedNumber prop is passed', () => {
    it('should display selectedNumber state initial value', () => {
      expect(picker.find('div.number-picked').text()).toBe('1');
    });
  });

  describe('When a selectedNumber prop is passed', () => {
    const sampleNum = 4;
    const pickerWithNum = shallow(<NumberPicker numberSelected={sampleNum} />);

    it('should initially display the correct passed value', () => {
      expect(pickerWithNum.find('div.number-picked').text()).toBe(sampleNum.toString());
    });
  });

  describe('When updateMode prop is not passed (not bulk)', () => {
    it('should NOT render bulk action div', () => {
      expect(picker.find('div.bulk-action-button')).toHaveLength(0);
    });
  });

  describe('When updateMode prop equals bulk', () => {

    const pickerBulk = shallow(<NumberPicker updateMode="bulk" />);

    it('should render bulk action div', () => {
      expect(pickerBulk.find('div.bulk-action-button')).toHaveLength(1);
    });

    describe('If no bulkActionLabel prop is passed', () => {
      it('should render empty bulk action label', () => {
        expect(pickerBulk.find('div.bulk-action-button').text()).toBe('');
      });
    });

    describe('If bulkActionLabel is passed', () => {
      const sampleLabel = 'add to cart';
      const pickerBulkWithLabel = shallow(<NumberPicker updateMode="bulk" bulkActionLabel={sampleLabel} />);

      it('should render the correct bulk action label', () => {
        expect(pickerBulkWithLabel.find('div.bulk-action-button').text()).toBe(sampleLabel);
      });
    });

  });
});


describe('Interactions with NumberPicker component', () => {

  describe('If updateMode prop is not passed (not bulk)', () => {

    //create NumberPicker component with no updateMode prop passed
    //and all handler functions passed
    const props = {
      handleNumberIncrement: jest.fn(),
      handleNumberDecrement: jest.fn(),
      handleBulkAction: jest.fn()
    };

    const picker = shallow(<NumberPicker {...props} />);

    describe('When Increment button clicked', () => {
      //invoke onClick function of the increment button
      picker.find('div.number-changer').at(0).prop('onClick')();

      it('should call the increment handling function', () => {
        expect(props.handleNumberIncrement).toHaveBeenCalledTimes(1);
      });
    });

    describe('When Decrement button clicked', () => {
      //invoke onClick function of the decrement button
      picker.find('div.number-changer').at(1).prop('onClick')();

      it('should call the decrement handling function', () => {
        expect(props.handleNumberDecrement).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('If updateMode prop equals bulk', () => {
    //create NumberPicker component with not updateMode prop equals 'bulk'
    //and all handler functions passed
    const props = {
      handleNumberIncrement: jest.fn(),
      handleNumberDecrement: jest.fn(),
      handleBulkAction: jest.fn(),
      updateMode: 'bulk'
    };

    const picker = shallow(<NumberPicker {...props} />);

    describe('When Increment button clicked', () => {
      //invoke onClick function of the increment button
      picker.find('div.number-changer').at(0).prop('onClick')();

      it('should not call the increment handling function', () => {
        expect(props.handleNumberIncrement).toHaveBeenCalledTimes(0);
      });
    });

    describe('When Decrement button clicked', () => {
      //invoke onClick function of the decrement button
      picker.find('div.number-changer').at(1).prop('onClick')();

      it('should not call the decrement handling function', () => {
        expect(props.handleNumberDecrement).toHaveBeenCalledTimes(0);
      });
    });

    describe('When bulk action button in clicked', () => {
      //invoke onClick function of the bulk action button
      picker.find('div.bulk-action-button').prop('onClick')();

      it('should call bulk action handler method', () => {
        expect(props.handleBulkAction).toHaveBeenCalledTimes(1);
      });
    });

  });

});
