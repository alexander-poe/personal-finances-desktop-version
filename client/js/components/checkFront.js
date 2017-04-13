import React, { Component } from 'react';
import TransactionInput from './transactionInput';

class CheckFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionInput: false
    }
    this.transactionInputShow = this.transactionInputShow.bind(this);
  }

  transactionInputShow(e) {
    this.setState({transactionInput: !this.state.transactionInput})
  }

  render() {
    let date = new Date(this.props.date).toLocaleDateString()
    console.log(date)
    return (
      <div key={this.props.index} className="check">
        <div className="checkTop">
          <p>Total: ${this.props.amount} </p>
          <p className="right">
            Date: {date}
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
          <p
            className="addTrans"
            onClick={this.transactionInputShow}
          >
          +
          </p>
      </div>

        {
        this.state.transactionInput ?
        <TransactionInput
          className="transactionInput w3-container w3-center w3-animate-top"
        /> : null
        }
      </div>
    )
  }
}

export default CheckFront;
