import React, { Component } from 'react';

class CheckFront extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.index} className="check">
        <div className="checkTop">
          <p>Total: ${this.props.amount} </p>
          <p className="right">
            Date: {this.props.date}
          </p>
        </div>
        <div className="checkMid">
          <p> 20: ${this.props.twenty} </p> <br />
          <p> 30: ${this.props.thirty} </p> <br />
          <p> 50: ${this.props.fifty} </p>  <br />
        </div>
        <div className='checkBottom'>
          <p> description: {this.props.description}</p>
          <img className="right checkPhoto" src="http://www.getwordtemplates.com/wp-content/uploads/2016/01/payment-receipt-image-7.jpg" />
        </div>
      </div>
    )
  }
}

export default CheckFront;
