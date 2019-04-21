import React, { Component } from 'react';
import './NumberPicker.css';

class NumberPicker extends Component {
  state = {
    numberSelected: 1,
  }

  constructor(props) {
    super(props);
    this.state.numberSelected = this.props.numberSelected;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    console.log(`increment ${this.props.updateMode}`);

    const currentNumber = this.state.numberSelected;
    this.setState({numberSelected: currentNumber + 1});
    if(this.props.updateMode !== 'bulk' && typeof this.props.handleNumberIncrement !== "undefined") {
      this.props.handleNumberIncrement();
    }
  }

  decrement() {
    const currentNumber = this.state.numberSelected;
    if (currentNumber > 1) {
      this.setState({numberSelected: currentNumber - 1});
      
      if(this.props.updateMode !== 'bulk' && typeof this.props.handleNumberDecrement !== "undefined") {
        this.props.handleNumberDecrement();
      }

    }
  }

  render() {
    const {updateMode, handleBulkIncrement} = this.props;
    const {numberSelected} = this.state;

    return(
      <div className="number-picker-container">
        <div className="number-picked">{numberSelected}</div>
        <div className="number-changers-container">
          <div className="number-changer" onClick={()=>{this.increment();}}>+</div>
          <div className="number-changer" onClick={()=>{this.decrement();}}>-</div>
        </div>
        {updateMode === 'bulk' &&
          <div className="bulk-add-button" onClick={()=>{handleBulkIncrement(numberSelected);}}>
            ADD TO CART
          </div>
        }
      </div>
    );
  }
}

export default NumberPicker;
