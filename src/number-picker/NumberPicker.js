import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NumberPicker.css';

/*
 * Number Picker state component is a tool used by Popup Cart and Cart components.
 * It's used to increment and decrement quantity of a product in the shopping cart.
 * It's passed an update modes property that controls how it work and has two values:
 * - 'live' update mode (default): used to update cart intstantly with every single increment
 *    or decrement (as in Shopping Cart page)
 * - 'bulk' update mode: used to update cart as a bulk action, like picking the quantity
 *    of a product to be added, then adding them to cart in one action (as in Product page)
 * It's also passed the label required for the bulk action button displayed in
 * case of 'bulk' update mode
 */
class NumberPicker extends Component {
  // Prop types are checked to ensure that
  // the correct types are passed from parent component
  static propTypes = {
    numberSelected: PropTypes.number,
    handleNumberIncrement: PropTypes.func,
    handleNumberDecrement: PropTypes.func,
    handleBulkAction: PropTypes.func,
    updateMode: PropTypes.string,
    bulkActionLabel: PropTypes.string
  }

  state = {
    numberSelected: 1,
  }

  constructor(props) {
    super(props);

    //initializing selected number state by the initial value passed as prop
    if(this.props.numberSelected) { //if initial value passed
      this.state.numberSelected = this.props.numberSelected;
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  /* Increments the current number selected by 1, and calls single increment
     handler in case of live update mode */
  increment() {
    const currentNumber = this.state.numberSelected;
    this.setState({numberSelected: currentNumber + 1});

    //if update mode is NOT bulk and increment handler method is properly passed
    if(this.props.updateMode !== 'bulk' && typeof this.props.handleNumberIncrement !== "undefined") {
      this.props.handleNumberIncrement();
    }
  }

  /* Decrements the current number selected by 1, and calls single decrement
     handler in case of live update mode */
  decrement() {
    const currentNumber = this.state.numberSelected;

    //if current number is 1, then no action can be done
    if (currentNumber > 1) {
      this.setState({numberSelected: currentNumber - 1});

      //if update mode is NOT bulk and decrement handler method is properly passed
      if(this.props.updateMode !== 'bulk' && typeof this.props.handleNumberDecrement !== "undefined") {
        this.props.handleNumberDecrement();
      }
    }
  }

  render() {
    //retrieve update mode (bulk or nothing which means live), bulk action
    //button label and bulk action handler method passed as props
    const {updateMode, bulkActionLabel, handleBulkAction} = this.props;
    const {numberSelected} = this.state;

    return(
      <div className="number-picker-container">
        <div className="number-picked">{numberSelected}</div>
        <div className="number-changers-container">
          <div className="number-changer" onClick={()=>{this.increment();}}>+</div>
          <div className="number-changer" onClick={()=>{this.decrement();}}>-</div>
        </div>

        {/* In case of bulk update mode ONLY, display bulk action button */}
        {updateMode === 'bulk' &&
          <div className="bulk-action-button" onClick={()=>{handleBulkAction(numberSelected);}}>
            {bulkActionLabel}
          </div>
        }
      </div>
    );
  }
}

export default NumberPicker;
